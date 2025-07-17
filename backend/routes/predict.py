# routes/predict.py
from flask import Blueprint, request, jsonify, send_file
import pandas as pd
import numpy as np
import os
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
from io import BytesIO
import datetime

predict_bp = Blueprint("predict", __name__)

model_path = "cnn_lstm_attention_oil_forecast.keras"
model = load_model(model_path)

input_days = 730
output_days = 180

def preprocess(df):
    df = df.sort_values('DATEPRD').set_index('DATEPRD')
    df = df.drop(columns=['FLOW_KIND', 'WELL_TYPE'], errors='ignore')
    df['month'] = df.index.month
    df['dayofyear'] = df.index.dayofyear
    df['weekday'] = df.index.weekday
    df['BORE_OIL_VOL_LAG1'] = df['BORE_OIL_VOL'].shift(1)
    df['BORE_OIL_VOL_MA7'] = df['BORE_OIL_VOL'].rolling(window=7).mean()
    df = df.dropna()
    full_index = pd.date_range(start=df.index.min(), end=df.index.max(), freq='D')
    df = df.reindex(full_index)
    df = df.ffill()
    df.index.name = 'DATEPRD'
    return df

@predict_bp.route("/predict", methods=["POST"])
def predict():
    try:
        file = request.files.get("file")
        if not file:
            return jsonify({"error": "No file uploaded"}), 400

        print("✅ File received:", file.filename)

        df = pd.read_excel(file, parse_dates=["DATEPRD"])
        print("✅ File read into DataFrame")

        df = preprocess(df)
        print("✅ Preprocessing done")

        scaler = MinMaxScaler()
        scaled = scaler.fit_transform(df)
        scaled_df = pd.DataFrame(scaled, index=df.index, columns=df.columns)

        if len(scaled_df) < input_days:
            return jsonify({"error": "Not enough data. Minimum 730 days required."}), 400

        input_data = scaled_df.iloc[-input_days:].values.reshape(1, input_days, -1)
        print("✅ Input reshaped:", input_data.shape)

        prediction_scaled = model.predict(input_data)[0]
        print("✅ Prediction done")

        temp = np.tile(input_data[0][-1], (output_days, 1))
        temp[:, df.columns.get_loc("BORE_OIL_VOL")] = prediction_scaled
        prediction = scaler.inverse_transform(temp)[:, df.columns.get_loc("BORE_OIL_VOL")]

        future_dates = pd.date_range(start=df.index[-1] + pd.Timedelta(days=1), periods=output_days)
        result_df = pd.DataFrame({
            "DATE": future_dates,
            "PREDICTED_BORE_OIL_VOL": prediction
        })

        output = BytesIO()
        result_df.to_excel(output, index=False)
        output.seek(0)

        return send_file(output, as_attachment=True, download_name="forecast.xlsx", mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    except Exception as e:
        print("❌ ERROR:", e)
        return jsonify({"error": str(e)}), 500
