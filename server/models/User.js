const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['candidate', 'employer', 'admin'], default: 'candidate' },
    profile: {
        resume: String, // For candidates
        skills: [String], // For candidates
        companyName: String, // For employers
        location: String, // For employers
        logo: String, // For employers (URL)
        description: String, // For employers
        website: String // For employers
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
