import React, { useEffect, useState } from 'react';
import api from '../api';
import Hero from '../components/Hero';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';

const Home = () => {
    const [featuredJobs, setFeaturedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await api.get('/jobs');
                // Just take the first 3 jobs for the featured section
                setFeaturedJobs(res.data.slice(0, 3));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div>
            <Hero />

            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore the latest job openings from top companies. Hand-picked roles just for you.
                    </p>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500 italic">Loading featured jobs...</p>
                ) : featuredJobs.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 text-lg">No featured jobs available at the moment.</p>
                        <p className="text-gray-400 text-sm mt-2">Check back later or browse all jobs!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredJobs.map((job) => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link
                        to="/jobs"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-transform transform hover:-translate-y-1 shadow-lg"
                    >
                        Browse All Jobs
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Thousands of Jobs</h3>
                            <p className="text-gray-600">Daily updates with new opportunities across all industries.</p>
                        </div>
                        <div className="p-6">
                            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Easy Application</h3>
                            <p className="text-gray-600">Apply to multiple jobs with a single click using your profile.</p>
                        </div>
                        <div className="p-6">
                            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Fast Response</h3>
                            <p className="text-gray-600">Get notified immediately when an employer views your application.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
