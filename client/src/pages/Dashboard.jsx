import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import EmployerDashboard from '../components/EmployerDashboard';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const [resumeFile, setResumeFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const userRes = await api.get('/users/profile');
                setUser(userRes.data);

                if (userRes.data.role === 'candidate') {
                    const appRes = await api.get('/applications/my-applications');
                    setApplications(appRes.data);
                }
            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    const handleResumeUpload = async (e) => {
        e.preventDefault();
        if (!resumeFile) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('resume', resumeFile);

        try {
            const res = await api.post('/users/upload-resume', formData);
            setUser(prev => ({
                ...prev,
                profile: {
                    ...prev.profile,
                    resume: res.data.resume, // Assuming backend returns path 
                    skills: res.data.skills
                }
            }));
            alert('Resume uploaded successfully!');
            setResumeFile(null);
        } catch (error) {
            console.error(error);
            alert('Failed to upload resume.');
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;
    if (!user) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-24">
                        <div className="p-6 bg-blue-600 text-white">
                            <h2 className="text-xl font-bold">{user.username}</h2>
                            <p className="text-blue-100 text-sm">{user.email}</p>
                            <span className="inline-block mt-2 px-2 py-1 bg-blue-700 rounded text-xs uppercase tracking-wide">
                                {user.role}
                            </span>
                        </div>
                        <nav className="p-2">
                            {user.role === 'employer' ? (
                                <div className="p-4 text-center text-gray-500 text-sm">
                                    Manage your jobs and applicants in the dashboard panel.
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setActiveTab('profile')}
                                        className={`w-full text-left px-4 py-3 rounded-md mb-1 transition-colors flex items-center ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        My Profile
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('applications')}
                                        className={`w-full text-left px-4 py-3 rounded-md mb-1 transition-colors flex items-center ${activeTab === 'applications' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                        Applied Jobs
                                    </button>
                                </>
                            )}
                        </nav>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-grow">
                    {user.role === 'employer' ? (
                        <EmployerDashboard />
                    ) : (
                        <>
                            {activeTab === 'profile' && (
                                <div className="space-y-6">
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                        <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Details</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500">Username</label>
                                                <p className="mt-1 text-lg text-gray-900">{user.username}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500">Email</label>
                                                <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-500">Skills</label>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {user.profile?.skills && user.profile.skills.length > 0 ? (
                                                        user.profile.skills.map((skill, index) => (
                                                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                                {skill}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <p className="text-gray-400 italic">No skills listed yet.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                        <h2 className="text-xl font-bold text-gray-800 mb-6">Resume</h2>
                                        {user.profile?.resume ? (
                                            <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-md flex items-center justify-between">
                                                <span className="flex items-center">
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Resume uploaded
                                                </span>
                                                <span className="text-sm font-semibold">Active</span>
                                            </div>
                                        ) : (
                                            <div className="mb-6 bg-yellow-50 text-yellow-700 p-4 rounded-md">
                                                Please upload a resume to apply for jobs and extract skills.
                                            </div>
                                        )}

                                        <form onSubmit={handleResumeUpload} className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300 text-center">
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Update Credentials</h3>
                                            <p className="text-gray-500 text-sm mb-4">Upload a new PDF to update your skills and application resume.</p>

                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => setResumeFile(e.target.files[0])}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4 mx-auto max-w-xs"
                                            />

                                            <button
                                                type="submit"
                                                disabled={!resumeFile || uploading}
                                                className={`px-6 py-2 rounded-md font-semibold text-white shadow-sm transition-colors ${!resumeFile || uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                                    }`}
                                            >
                                                {uploading ? 'Uploading...' : 'Upload Resume'}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'applications' && (
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100">
                                        <h2 className="text-xl font-bold text-gray-800">My Applications</h2>
                                    </div>

                                    {applications.length === 0 ? (
                                        <div className="p-12 text-center">
                                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p className="text-gray-500 text-lg">You haven't applied to any jobs yet.</p>
                                            <button
                                                onClick={() => navigate('/')}
                                                className="mt-4 text-blue-600 font-medium hover:underline"
                                            >
                                                Browse Jobs
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead className="bg-gray-50 border-b border-gray-200">
                                                    <tr>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Title</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Applied</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {applications.map((app) => (
                                                        <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{app.job?.title || 'Unknown Job'}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{app.job?.company?.username || 'Confidential'}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                                {new Date(app.createdAt).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${app.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                                                                        app.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                                                                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                                                'bg-gray-100 text-gray-800'
                                                                    }`}>
                                                                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <button
                                                                    onClick={() => navigate(`/jobs/${app.job?._id}`)}
                                                                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                                                >
                                                                    View Job
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
