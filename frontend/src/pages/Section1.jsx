import React from 'react';
import Background from '../assets/Background.jpg'; // Check this path
import logo from '../assets/logo-artec-2.png'; // Check this path
const HeroSection = () => {
    return (
        <div
            className="relative h-screen bg-cover bg-center flex items-center justify-center text-center"
            style={{ backgroundImage: `url(${Background})` }}
        >
            {/* 🔵 Blue Overlay */}
            <div className="absolute inset-0 "
                style={{ backgroundColor: 'rgba(3, 9, 26, 0.7)' }}></div>

            {/* 🔲 Content (above overlay) */}
            <div className="flex flex-col z-10 bg-opacity-60 p-8 w-1/2 ounded space-y-24">
                <img src={logo} alt="ARTEC INT" className="mx-auto h-28" />
                <h1 className="text-white text-3xl md:text-4xl font-light text-center">
                    Our duty is to support your business
                    With Technology, Innovation & Expertise
                </h1>
            </div>
        </div>
    );
};

export default HeroSection;
