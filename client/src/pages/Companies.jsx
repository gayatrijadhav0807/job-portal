import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await api.get('/users/companies');
                setCompanies(res.data);
            } catch (error) {
                console.error('Failed to fetch companies', error);
            }
        };
        fetchCompanies();
    }, []);

    const filteredCompanies = companies.filter(company =>
        (company.profile?.companyName || company.username).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Top Companies</h1>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-10">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search companies..."
                        className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map(company => (
                    <Link to={`/companies/${company._id}`} key={company._id} className="block group">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-xl">
                                {company.profile?.logo ? (
                                    <img src={company.profile.logo} alt="logo" className="w-full h-full object-contain rounded-lg" />
                                ) : (
                                    (company.profile?.companyName || company.username).charAt(0).toUpperCase()
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {company.profile?.companyName || company.username}
                                </h3>
                                <p className="text-sm text-gray-500 flex items-center mt-1">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {company.profile?.location || 'Location not specified'}
                                </p>
                                <span className="inline-block mt-2 text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                    {company.jobCount} Open Jobs
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredCompanies.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No companies found matching "{searchTerm}"</p>
                </div>
            )}
        </div>
    );
};

export default Companies;
