import React from 'react';
import { useEffect } from 'react';
import './phase4.css'

export default function Phase4() {

    useEffect(() => {
        document.title = "Phase 4";
        }, []);

        const handleNextClick = () => {
            window.close();
        };
    
    return (
        <div className="min-h-screen bg-teal-600 flex flex-col items-center justify-center py-12 px-4">
        <h1 className="text-white text-6xl md:text-7xl lg:text-8xl font-bold mb-12 text-center">
            Phase 4
        </h1>
        
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 lg:p-10 w-full max-w-3xl mx-auto mb-16">
            <h2 className="text-teal-600 text-4xl md:text-5xl lg:text-6xl font-bold text-center">
            Software Project
            </h2>
        </div>
        
        <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg transform hover:scale-105"
        >
            Finish
        </button>
        </div>
    );
}