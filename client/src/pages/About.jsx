import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">About JobPortal</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        We are bridging the gap between talent and opportunity. Our mission is to make job hunting and recruitment as seamless as possible.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 space-y-20">
                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To empower individuals to achieve their career goals and help organizations find the perfect talent to drive their success.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To become the world's most trusted and efficient employment marketplace, fostering a global community of professionals.
                        </p>
                    </div>
                </div>

                {/* Key Features */}
                <div>
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose JobPortal?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
                            <p className="text-gray-600">Our advanced algorithms ensure that you see jobs and candidates that strictly match your criteria.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2">Verified Companies</h3>
                            <p className="text-gray-600">We partner with reputable organizations to ensure a safe and legitimate job search experience.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2">Easy Application</h3>
                            <p className="text-gray-600">Save time with our one-click apply feature using your stored profile and resume.</p>
                        </div>
                    </div>
                </div>

                {/* Technology Stack */}
                <div className="bg-gray-50 rounded-xl p-8">
                    <h2 className="text-3xl font-bold text-center mb-8">Built With Modern Tech</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['React.js', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS', 'JWT Auth'].map((tech) => (
                            <span key={tech} className="bg-white px-6 py-2 rounded-full shadow-sm text-gray-700 font-medium border border-gray-200">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-900 text-white py-16 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Ready to start your journey?</h2>
                    <div className="space-x-4">
                        <Link to="/register" className="bg-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
                            Get Started
                        </Link>
                        <Link to="/jobs" className="bg-transparent border border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-gray-900 transition">
                            Browse Jobs
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
