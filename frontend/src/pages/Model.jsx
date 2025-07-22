import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
const Model = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState("");
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setDownloadUrl("");
    };
    const handleSubmit = async () => {
        if (!file) return toast.warning("📄 Please upload an Excel file first.");
        setIsLoading(true);
        setDownloadUrl("");
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
            toast.success("✅ Forecast generated successfully!");
        } catch (err) {
            console.error(err);
            toast.error(`❌ ${err.message || "Something went wrong"}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (<>
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
                <p>📈 <strong>Output:</strong> Forecast of the next <strong>365 days</strong> (1 year).</p>
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
        </section>
        </>
    );
};

export default Model;
