import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const sampleData = [
    { day: 'Day 1', production: 240 },
    { day: 'Day 2', production: 310 },
    { day: 'Day 3', production: 250 },
    { day: 'Day 4', production: 130 },
    { day: 'Day 5', production: 270 },
    { day: 'Day 6', production: 200 },
    { day: 'Day 7', production: 140 },
];

const Section4 = ({ user }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleTryNow = () => {
        if (user) {
            navigate('/model');
        } else {
            setShowModal(true);
        }
    };

    return (
        <section className="bg-gray-100 py-20 px-6 md:px-20 relative">
            <div className="max-w-6xl mx-auto text-center space-y-12">
                <h2 className="text-4xl font-bold text-gray-800">
                    Oil Production Forecasting Model
                </h2>

                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                    Discover our AI-powered solution for predicting oil production with precision.
                    This intelligent forecasting model helps energy companies make smarter decisions
                    by analyzing historical well data, identifying patterns, and projecting future output.
                </p>

                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sampleData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="production"
                                stroke="#2563EB"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                                animationDuration={1500}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <button
                        onClick={handleTryNow}
                        className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
                    >
                        Try Now
                    </button>
                </div>
            </div>

            {/* 🔒 Login Required Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-8 text-center max-w-sm w-full shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Login Required</h3>
                        <p className="text-gray-600 mb-6">
                            You must be logged in to access the model prediction feature.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded border text-gray-700 border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Section4;
