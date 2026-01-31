const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const User = require('../models/User'); // Explicitly load User model to ensure registration
const authMiddleware = require('../middleware/authMiddleware');

// Create Job (Employer/Admin only)
router.post('/', authMiddleware(['employer', 'admin']), async (req, res) => {
    try {
        const job = await Job.create({ ...req.body, company: req.user.id });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get My Jobs (Employer only)
router.get('/my-jobs', authMiddleware(['employer']), async (req, res) => {
    try {
        const jobs = await Job.find({ company: req.user.id });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get All Jobs
router.get('/', async (req, res) => {
    console.log('GET /jobs hit');
    try {
        const jobs = await Job.find().populate('company', 'username email'); // Re-enabled populate to see if it works now
        res.json(jobs);
    } catch (error) {
    } catch (error) {
        console.error('Job Fetch Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get Single Job
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('company', 'username email');
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update Job (Employer/Admin only)
router.put('/:id', authMiddleware(['employer', 'admin']), async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        if (job.company.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete Job (Employer/Admin only)
router.delete('/:id', authMiddleware(['employer', 'admin']), async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        if (job.company.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await job.deleteOne();
        res.json({ message: 'Job removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get Matched Jobs
router.get('/matched', authMiddleware(['candidate']), async (req, res) => {
    try {
        const { matchJobs } = require('../services/jobMatcher');
        const matchedJobs = await matchJobs(req.user.id);
        res.json(matchedJobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
