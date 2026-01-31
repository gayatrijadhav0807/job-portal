import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);
    const [message, setMessage] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchJobAndStatus = async () => {
            try {
                const jobRes = await api.get(`/jobs/${id}`);
                setJob(jobRes.data);

                if (token) {
                    const statusRes = await api.get(`/applications/check/${id}`);
                    setHasApplied(statusRes.data.hasApplied);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobAndStatus();
    }, [id, token]);

    const handleApply = async () => {
        if (!token) {
            navigate('/login');
            return;
        }

        if (hasApplied) return;

        setApplying(true);
        setMessage(null);

        try {
            await api.post('/applications', { jobId: id });
            setHasApplied(true);
            setMessage({ type: 'success', text: 'Application submitted successfully!' });
        } catch (error) {
            console.error(error);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to apply. Please try again.'
            });
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-gray-500">Loading job details...</p>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-red-500">Job not found.</p>
                <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Back to Jobs</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Link to="/" className="text-gray-500 hover:text-blue-600 mb-6 inline-block flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Jobs
            </Link>

            {message && (
                <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                        <p className="text-xl text-blue-600 font-medium mb-4">{job.company?.username || 'Confidential'}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {job.location}
                            </span>
                            <span className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {job.jobType}
                            </span>
                            <span className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {job.salary ? `$${job.salary.toLocaleString()}` : 'Not Specified'}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleApply}
                        disabled={hasApplied || applying}
                        className={`mt-4 md:mt-0 px-8 py-3 rounded-md font-semibold transition-colors shadow-md ${hasApplied
                                ? 'bg-green-100 text-green-700 cursor-default'
                                : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300'
                            }`}
                    >
                        {hasApplied ? 'Applied' : (applying ? 'Applying...' : 'Apply Now')}
                    </button>
                </div>

                <div className="border-t border-gray-200 pt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
                    <p className="text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
                        {job.description}
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements & Skills</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
                        {job.requirements && job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>

                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">Experience Level</h3>
                        <p className="text-blue-800">{job.experienceLevel}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
