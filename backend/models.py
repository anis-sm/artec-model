from database import db

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    mobile_number = db.Column(db.String(20))
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

class Prediction(db.Model):
    __tablename__ = 'predictions'
    prediction_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    input_file_name = db.Column(db.Text, nullable=False)
    input_uploaded_at = db.Column(db.DateTime)
    input_start = db.Column(db.Date)
    input_end = db.Column(db.Date)
    predicted_until = db.Column(db.Date)
    prediction_result = db.Column(db.JSON)
    output_file_name = db.Column(db.Text)
