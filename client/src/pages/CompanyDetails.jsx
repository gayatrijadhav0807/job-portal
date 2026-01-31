import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import JobCard from '../components/JobCard';

const CompanyDetails = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const res = await api.get(`/users/companies/${id}`);
                setCompany(res.data.company);
                setJobs(res.data.jobs);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCompanyDetails();
    }, [id]);

    if (loading) return <div className="p-10 text-center">Loading Company Details...</div>;
    if (!company) return <div className="p-10 text-center">Company not found</div>;

    return (
        <div>
            {/* Header / Cover */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center text-blue-600 text-3xl font-bold shadow-lg mb-4">
                        {/* Placeholder Logo Logic */}
                        {(company.profile?.companyName || company.username).charAt(0).toUpperCase()}
                    </div>
                    <h1 className="text-4xl font-bold mb-2">{company.profile?.companyName || company.username}</h1>
                    <div className="flex justify-center items-center space-x-4 text-blue-100">
                        {company.profile?.location && (
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                {company.profile.location}
                            </span>
                        )}
                        {company.profile?.website && (
                            <a href={company.profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                                Website
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* About Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-4">About Company</h2>
                    <p className="text-gray-600 leading-relaxed">
                        {company.profile?.description || 'No description available for this company.'}
                    </p>
                </div>

                {/* Job Listings */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Open Positions ({jobs.length})</h2>
                    {jobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.map(job => (
                                <JobCard key={job._id} job={{ ...job, company: company }} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">No current open positions.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanyDetails;
