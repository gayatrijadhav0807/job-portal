import React from 'react';

const Hero = () => {
    return (
        <div className="bg-blue-600 py-20 mb-8">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Find Your Dream Job
                </h1>
                <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                    Browse thousands of jobs from top companies and launch your career today.
                </p>

                <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 w-full">
                        <input
                            type="text"
                            placeholder="Job title, keywords, or company"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex-1 w-full">
                        <input
                            type="text"
                            placeholder="City, state, or zip code"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button className="w-full md:w-auto bg-blue-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors">
                        Search Jobs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
