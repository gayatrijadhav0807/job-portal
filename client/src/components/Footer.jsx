import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 pt-12 pb-8 mt-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Job Portal</h3>
                        <p className="text-sm">
                            Connecting talent with opportunity. Find your dream job or the perfect candidate with our advanced matching system.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-white">Home</Link></li>
                            <li><Link to="/jobs" className="hover:text-white">Browse Jobs</Link></li>
                            <li><Link to="/companies" className="hover:text-white">Companies</Link></li>
                            <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">For Employers</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/post-job" className="hover:text-white">Post a Job</Link></li>
                            <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                            <li><Link to="/resources" className="hover:text-white">Resources</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                                <span className="mr-2">📧</span> support@jobportal.com
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">📞</span> +1 (555) 123-4567
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">📍</span> San Francisco, CA
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Job Portal System. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
