import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const EmployerDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('my-jobs'); // my-jobs, post-job, applicants
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [newJob, setNewJob] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
        jobType: 'Full Time',
        experienceLevel: 'Entry Level',
        requirements: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchMyJobs();
    }, []);

    const fetchMyJobs = async () => {
        try {
            const res = await api.get('/jobs/my-jobs');
            setJobs(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handlePostJob = async (e) => {
        e.preventDefault();
        try {
            const formattedJob = {
                ...newJob,
                requirements: newJob.requirements.split(',').map(req => req.trim())
            };
            await api.post('/jobs', formattedJob);
            alert('Job Posted Successfully!');
            setNewJob({ title: '', description: '', location: '', salary: '', jobType: 'Full Time', experienceLevel: 'Entry Level', requirements: '' });
            setActiveTab('my-jobs');
            fetchMyJobs();
        } catch (error) {
            console.error(error);
            alert('Failed to post job');
        }
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;
        try {
            await api.delete(`/jobs/${id}`);
            setJobs(jobs.filter(job => job._id !== id));
        } catch (error) {
            console.error(error);
            alert('Failed to delete job');
        }
    };

    const viewApplicants = async (jobId) => {
        try {
            setSelectedJobId(jobId);
            const res = await api.get(`/applications/job/${jobId}`);
            setApplicants(res.data);
            setActiveTab('applicants');
        } catch (error) {
            console.error(error);
            alert('Failed to fetch applicants');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold">Employer Dashboard</h2>
                <div className="space-x-4">
                    <button
                        onClick={() => setActiveTab('my-jobs')}
                        className={`px-3 py-1 rounded ${activeTab === 'my-jobs' ? 'bg-white text-blue-600' : 'text-blue-100 hover:text-white'}`}
                    >
                        My Jobs
                    </button>
                    <button
                        onClick={() => setActiveTab('post-job')}
                        className={`px-3 py-1 rounded ${activeTab === 'post-job' ? 'bg-white text-blue-600' : 'text-blue-100 hover:text-white'}`}
                    >
                        Post a Job
                    </button>
                </div>
            </div>

            <div className="p-6">
                {activeTab === 'my-jobs' && (
                    <div>
                        <h3 className="text-lg font-bold mb-4">My Posted Jobs</h3>
                        {jobs.length === 0 ? (
                            <p className="text-gray-500">No jobs posted yet.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-4 py-2">Title</th>
                                            <th className="px-4 py-2">Location</th>
                                            <th className="px-4 py-2">Applicants</th>
                                            <th className="px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jobs.map(job => (
                                            <tr key={job._id} className="border-b hover:bg-gray-50">
                                                <td className="px-4 py-2 font-medium">{job.title}</td>
                                                <td className="px-4 py-2 text-gray-600">{job.location}</td>
                                                <td className="px-4 py-2">
                                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                        {job.applicants.length} Applicants
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 space-x-2">
                                                    <button
                                                        onClick={() => viewApplicants(job._id)}
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        View Applicants
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteJob(job._id)}
                                                        className="text-red-600 hover:underline text-sm"
                                                    >
                                                        Delete
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

                {activeTab === 'post-job' && (
                    <div>
                        <h3 className="text-lg font-bold mb-4">Post a New Job</h3>
                        <form onSubmit={handlePostJob} className="max-w-2xl space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                                <input type="text" required className="w-full border rounded p-2" value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <input type="text" required className="w-full border rounded p-2" value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Salary</label>
                                    <input type="number" required className="w-full border rounded p-2" value={newJob.salary} onChange={e => setNewJob({ ...newJob, salary: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Job Type</label>
                                    <select className="w-full border rounded p-2" value={newJob.jobType} onChange={e => setNewJob({ ...newJob, jobType: e.target.value })}>
                                        <option>Full Time</option>
                                        <option>Part Time</option>
                                        <option>Remote</option>
                                        <option>Contract</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                                    <select className="w-full border rounded p-2" value={newJob.experienceLevel} onChange={e => setNewJob({ ...newJob, experienceLevel: e.target.value })}>
                                        <option>Entry Level</option>
                                        <option>Mid Level</option>
                                        <option>Senior Level</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea required rows="4" className="w-full border rounded p-2" value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Requirements (comma separated)</label>
                                <input type="text" className="w-full border rounded p-2" value={newJob.requirements} onChange={e => setNewJob({ ...newJob, requirements: e.target.value })} placeholder="React, Node.js, Team Player" />
                            </div>
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Post Job</button>
                        </form>
                    </div>
                )}

                {activeTab === 'applicants' && (
                    <div>
                        <div className="flex items-center mb-4">
                            <button onClick={() => setActiveTab('my-jobs')} className="text-gray-500 hover:text-gray-700 mr-2">
                                &larr; Back
                            </button>
                            <h3 className="text-lg font-bold">Applicants for Job</h3>
                        </div>

                        {applicants.length === 0 ? (
                            <p className="text-gray-500">No applicants yet.</p>
                        ) : (
                            <div className="grid gap-4">
                                {applicants.map(app => (
                                    <div key={app._id} className="border p-4 rounded bg-gray-50 flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold">{app.candidate?.username}</h4>
                                            <p className="text-sm text-gray-600">{app.candidate?.email}</p>
                                            <p className="text-xs text-gray-500">Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            {app.resume ? (
                                                <a
                                                    href={`http://localhost:5001/${app.resume.replace(/\\/g, '/')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                                                >
                                                    Download Resume
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 text-sm">No Resume</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployerDashboard;
