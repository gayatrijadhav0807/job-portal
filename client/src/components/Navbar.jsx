import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
                    <span className="mr-2">💼</span> JobPortal
                </Link>

                <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
                    <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <Link to="/jobs" className="hover:text-blue-600 transition-colors">Find Jobs</Link>
                    <Link to="/companies" className="hover:text-blue-600 transition-colors">Companies</Link>
                    <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
                </div>

                <div className="flex items-center space-x-4">
                    {token ? (
                        <>
                            <span className="text-gray-600 hidden md:block">Hi, {user?.username}</span>
                            <Link to="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">Dashboard</Link>
                            <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-md hover:bg-red-100 transition-colors">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
                            <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-shadow shadow-md font-medium">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
