const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Apply for a job
router.post('/', authMiddleware(['candidate']), upload.single('resume'), async (req, res) => {
    try {
        const { jobId } = req.body;
        // Check if resume is uploaded or exists in profile
        let resume = req.file ? req.file.path : null;

        if (!resume) {
            // Check if user has a resume in their profile
            const user = await Application.db.model('User').findById(req.user.id);
            if (user && user.profile && user.profile.resume) {
                resume = user.profile.resume;
            }
        }

        if (!resume) return res.status(400).json({ message: 'Resume is required. Please upload one or update your profile.' });

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        const existingApplication = await Application.findOne({ job: jobId, candidate: req.user.id });
        if (existingApplication) return res.status(400).json({ message: 'Already applied for this job' });

        const application = await Application.create({
            job: jobId,
            candidate: req.user.id,
            resume,
        });

        // Add applicant to job
        job.applicants.push(req.user.id);
        await job.save();

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Check if user has applied to a job
router.get('/check/:jobId', authMiddleware(['candidate']), async (req, res) => {
    try {
        const application = await Application.findOne({
            job: req.params.jobId,
            candidate: req.user.id
        });

        res.json({ hasApplied: !!application });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get applications for a job (Employer/Admin)
router.get('/job/:jobId', authMiddleware(['employer', 'admin']), async (req, res) => {
    try {
        const applications = await Application.find({ job: req.params.jobId })
            .populate('candidate', 'username email profile');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get my applications (Candidate)
router.get('/my-applications', authMiddleware(['candidate']), async (req, res) => {
    try {
        const applications = await Application.find({ candidate: req.user.id })
            .populate('job', 'title company location');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
