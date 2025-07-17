import React, { useState } from 'react';
import img from "../assets/Side.jpg";
import google from "../assets/icons/google.svg";
import facebook from "../assets/icons/facebook.svg";
import apple from "../assets/icons/apple.svg";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // important!
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            // Fetch user info right after login
            const userRes = await fetch("http://localhost:5000/api/me", {
                credentials: "include"
            });
            const userData = await userRes.json();

            // Cache user's public data
            sessionStorage.setItem("user", JSON.stringify(userData));

            // Redirect or reload
            window.location.href = "/";
        } else {
            alert(data.message);
        }
    };


    return (
        <div className="flex min-h-screen">
            {/* Left Image Section with Blue Overlay */}
            <div className="w-1/2 bg-cover bg-center relative" style={{ backgroundImage: `url(${img})` }}>
                {/* Blue Overlay */}
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(3, 9, 26, 0.7)' }}></div>

                {/* Content Above Overlay */}
                <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-6 text-center">
                    <h1 className="text-4xl font-bold font-cursive">SARL ARTEC INT</h1>
                    <p className="text-lg mt-4 max-w-md">
                        Your way to the future of technology. We are committed to providing innovative solutions that empower your business with the latest advancements in technology and expertise.
                    </p>
                </div>
            </div>

            {/* Right Login Section */}
            <div className="w-1/2 flex flex-col justify-center px-16">
                <h2 className="text-4xl font-bold text-blue-600">Welcome</h2>
                <p className="text-gray-500 mb-6">Login with Email</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Email Id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 w-full">LOGIN</button>
                </form>

                <p className="text-sm text-right text-blue-500 mt-2 cursor-pointer hover:underline">
                    Forgot your password?
                </p>

                <div className="my-6 text-center">
                    <span className="text-gray-400">OR</span>
                </div>

                <div className="flex gap-4 justify-center">
                    <button className="bg-gray-100 p-2 rounded-full"><img src={google} alt="Google" /></button>
                    <button className="bg-gray-100 p-2 rounded-full"><img src={facebook} alt="Facebook" /></button>
                    <button className="bg-gray-100 p-2 rounded-full"><img src={apple} alt="Apple" /></button>
                </div>

                <p className="mt-4 text-sm text-center">
                    Don’t have an account? <a className="text-blue-600 underline" href="/register">Register Now</a>
                </p>
            </div>
        </div>
    );
}
