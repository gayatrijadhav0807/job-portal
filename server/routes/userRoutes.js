const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { parseResume } = require('../services/resumeParser');

// Upload Resume & Update Profile
router.post('/upload-resume', authMiddleware(), upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const { text, email, skills } = await parseResume(req.file.path);

        const user = await User.findById(req.user.id);
        user.profile.resume = req.file.path;

        // Merge skills
        const newSkills = [...new Set([...(user.profile.skills || []), ...skills])];
        user.profile.skills = newSkills;

        await user.save();

        res.json({ message: 'Resume uploaded and processed', skills: newSkills });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get User Profile
router.get('/profile', authMiddleware(), async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get All Companies (Employers)
router.get('/companies', async (req, res) => {
    try {
        const companies = await User.find({ role: 'employer' }).select('-password');
        // Ideally we would also join with Job count, but for simplicity we can do it on frontend or separate query
        // Let's attach job count here for efficiency
        const companiesWithStats = await Promise.all(companies.map(async (company) => {
            const jobCount = await User.db.model('Job').countDocuments({ company: company._id });
            return { ...company.toObject(), jobCount };
        }));
        res.json(companiesWithStats);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get Company Details
router.get('/companies/:id', async (req, res) => {
    try {
        const company = await User.findById(req.params.id).select('-password');
        if (!company || company.role !== 'employer') {
            return res.status(404).json({ message: 'Company not found' });
        }
        const jobs = await User.db.model('Job').find({ company: company._id });
        res.json({ company, jobs });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
