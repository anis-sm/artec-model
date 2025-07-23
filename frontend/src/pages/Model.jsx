import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import * as XLSX from 'xlsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Model = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState("");
    const [chartData, setChartData] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setDownloadUrl("");
        setChartData(null);
    };

    const handleSubmit = async () => {
        if (!file) return toast.warning("📄 Please upload an Excel file first.");
        setIsLoading(true);
        setDownloadUrl("");
        setChartData(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("http://localhost:5000/api/predict", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Prediction failed");
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            setDownloadUrl(url);

            // Read Excel file for chart
            const arrayBuffer = await blob.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Prepare chart data
            const labels = jsonData.map(row => new Date(row.DATESTD).toLocaleDateString());
            const actualData = jsonData.map(row => row.Source === 'Actual' ? row.BORE_OIL_VOL : null);
            const predictedData = jsonData.map(row => row.Source === 'Predicted' ? row.BORE_OIL_VOL : null);

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Actual BORE_OIL_VOL',
                        data: actualData,
                        borderColor: 'black',
                        backgroundColor: 'black',
                        fill: false,
                        spanGaps: true,
                    },
                    {
                        label: 'Predicted BORE_OIL_VOL',
                        data: predictedData,
                        borderColor: 'blue',
                        backgroundColor: 'blue',
                        fill: false,
                        spanGaps: true,
                    },
                ],
            });

            toast.success("✅ Forecast generated successfully!");
        } catch (err) {
            console.error(err);
            toast.error(`❌ ${err.message || "Something went wrong"}`);
        } finally {
            setIsLoading(false);
        }
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Oil Production Forecast' },
        },
        scales: {
            x: { title: { display: true, text: 'Date' } },
            y: { title: { display: true, text: 'BORE_OIL_VOL' } },
        },
    };

    return (
        <>
            <Helmet>
                <title>Model - Oil Forecast App</title>
            </Helmet>
            <section className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
                <ToastContainer position="top-right" autoClose={3000} />
                <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
                    Forecast Oil Production
                </h1>
                {/* 📌 Requirements Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm p-4 mb-4 max-w-xl w-full">
                    <p>📅 <strong>Input:</strong> Excel file with at least <strong>730 days</strong> (2 years) of daily oil data.</p>
                    <p>📈 <strong>Output:</strong> Forecast of the next <strong>180 days</strong>.</p>
                </div>
                {/* Upload Card */}
                <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-xl space-y-4">
                    <input
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileChange}
                        className="border w-full px-4 py-2 rounded"
                    />
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition"
                        disabled={!file || isLoading}
                    >
                        {isLoading ? "⏳ Predicting..." : "Run Forecast"}
                    </button>
                    {downloadUrl && (
                        <a
                            href={downloadUrl}
                            download="forecast_results.xlsx"
                            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                        >
                            📥 Download Results
                        </a>
                    )}
                </div>
                {/* Chart Display */}
                {chartData && (
                    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-4xl mt-6">
                        <div style={{ height: '400px' }}>
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default Model;