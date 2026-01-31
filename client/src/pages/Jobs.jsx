import React, { useEffect, useState } from 'react';
import api from '../api';
import JobCard from '../components/JobCard';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(6);
    const [loading, setLoading] = useState(true); // Added loading state

    // Search States
    const [searchTerm, setSearchTerm] = useState('');
    const [locationSearch, setLocationSearch] = useState('');

    // Filter States
    const [filters, setFilters] = useState({
        jobType: [],
        experienceLevel: [],
        salary: 0
    });

    const [error, setError] = useState(null);
    const [usingSamples, setUsingSamples] = useState(false); // Track if using samples

    const sampleJobs = [
        { _id: '1', title: 'Frontend Developer (Sample)', company: { username: 'Tech Corp' }, location: 'Remote', jobType: 'Full Time', experienceLevel: 'Mid Level', salary: 80000, description: 'Sample description' },
        { _id: '2', title: 'Backend Engineer (Sample)', company: { username: 'Data Systems' }, location: 'New York, NY', jobType: 'Full Time', experienceLevel: 'Senior Level', salary: 120000, description: 'Sample description' },
        { _id: '3', title: 'UI/UX Designer (Sample)', company: { username: 'Creative Studio' }, location: 'San Francisco, CA', jobType: 'Contract', experienceLevel: 'Mid Level', salary: 95000, description: 'Sample description' },
        { _id: '4', title: 'Product Manager (Sample)', company: { username: 'Innovate Inc' }, location: 'Austin, TX', jobType: 'Full Time', experienceLevel: 'Senior Level', salary: 140000, description: 'Sample description' },
        { _id: '5', title: 'DevOps Engineer (Sample)', company: { username: 'Cloud Net' }, location: 'Remote', jobType: 'Part Time', experienceLevel: 'Mid Level', salary: 70000, description: 'Sample description' },
        { _id: '6', title: 'Intern (Sample)', company: { username: 'StartUp' }, location: 'Boston, MA', jobType: 'Internship', experienceLevel: 'Entry Level', salary: 30000, description: 'Sample description' },
    ];

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await api.get('/jobs');
                setJobs(res.data);
                setFilteredJobs(res.data);
                setUsingSamples(false);
            } catch (err) {
                console.error("Backend failed, using samples:", err);
                setJobs(sampleJobs);
                setFilteredJobs(sampleJobs);
                setUsingSamples(true);
                setError(null); // Clear error since we are handling it gracefully
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // Handle Checkbox Changes
    const handleCheckboxChange = (category, value) => {
        setFilters(prev => {
            const current = prev[category];
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];

            return { ...prev, [category]: updated };
        });
    };

    // Handle Range Change
    const handleSliderChange = (e) => {
        setFilters({ ...filters, salary: Number(e.target.value) });
    };

    // Apply Filters and Search
    useEffect(() => {
        let result = jobs;

        // Filter by text search (Title or Company Name)
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(job =>
                job.title.toLowerCase().includes(lowerTerm) ||
                job.company?.username.toLowerCase().includes(lowerTerm)
            );
        }

        // Filter by Location
        if (locationSearch) {
            const lowerLoc = locationSearch.toLowerCase();
            result = result.filter(job => job.location.toLowerCase().includes(lowerLoc));
        }

        // Filter by Job Type
        if (filters.jobType.length > 0) {
            result = result.filter(job => filters.jobType.includes(job.jobType));
        }

        // Filter by Experience Level
        if (filters.experienceLevel.length > 0) {
            result = result.filter(job => filters.experienceLevel.includes(job.experienceLevel));
        }

        // Filter by Minimum Salary
        if (filters.salary > 0) {
            result = result.filter(job => job.salary >= filters.salary);
        }

        setFilteredJobs(result);
        setCurrentPage(1); // Reset to first page on filter change
    }, [filters, jobs, searchTerm, locationSearch]);

    // Pagination Logic
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="mt-4 text-gray-500">Loading jobs...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center text-red-600">
                <p className="text-xl font-bold">Error loading jobs</p>
                <p>{error}</p>
                <p className="text-sm mt-2 text-gray-500">Please check if the backend server is running.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Find Your Dream Job</h1>

            {usingSamples && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 mx-auto max-w-4xl">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                <span className="font-bold">Backend Connection Failed.</span> Showing sample data for demonstration purposes.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-8 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search by Job Title or Company"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Filter by Location (e.g. Remote, New York)"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={locationSearch}
                            onChange={(e) => setLocationSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className="w-full lg:w-1/4">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">Filters</h3>
                            <button
                                onClick={() => {
                                    setFilters({ jobType: [], experienceLevel: [], salary: 0 });
                                    setSearchTerm('');
                                    setLocationSearch('');
                                }}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Reset
                            </button>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold mb-2">Job Type</h4>
                            <div className="space-y-2">
                                {['Full Time', 'Part Time', 'Remote', 'Contract'].map(type => (
                                    <label key={type} className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                                            onChange={() => handleCheckboxChange('jobType', type)}
                                            checked={filters.jobType.includes(type)}
                                        />
                                        {type}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold mb-2">Experience Level</h4>
                            <div className="space-y-2">
                                {['Entry Level', 'Mid Level', 'Senior Level'].map(level => (
                                    <label key={level} className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                                            onChange={() => handleCheckboxChange('experienceLevel', level)}
                                            checked={filters.experienceLevel.includes(level)}
                                        />
                                        {level}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold mb-2">Min Salary: ${filters.salary.toLocaleString()}</h4>
                            <input
                                type="range"
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                min="0"
                                max="200000"
                                step="10000"
                                value={filters.salary}
                                onChange={handleSliderChange}
                            />
                            <div className="flex justify-between text-sm text-gray-500 mt-1">
                                <span>$0</span>
                                <span>$200k+</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Listings Grid */}
                <div className="w-full lg:w-3/4">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-600">{filteredJobs.length} jobs found</span>
                    </div>

                    {currentJobs.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentJobs.map((job) => (
                                    <JobCard key={job._id} job={job} />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-12">
                                    <nav className="inline-flex rounded-md shadow-sm -space-x-px">
                                        <button
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                                                }`}
                                        >
                                            Previous
                                        </button>
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => paginate(i + 1)}
                                                className={`px-4 py-2 border border-gray-300 text-sm font-medium ${currentPage === i + 1
                                                    ? 'bg-blue-50 border-blue-500 text-blue-600 z-10'
                                                    : 'bg-white text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                                                }`}
                                        >
                                            Next
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-lg border border-gray-200 shadow-sm">
                            <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No jobs found</h3>
                            <p className="mt-1 text-gray-500">We couldn't find any jobs matching your current filters.</p>
                            <button
                                onClick={() => setFilters({ jobType: [], experienceLevel: [], salary: 0 })}
                                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition w-auto inline-block"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
