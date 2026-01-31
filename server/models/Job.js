const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, required: true },
    jobType: { type: String, enum: ['Full Time', 'Part Time', 'Remote', 'Contract'], default: 'Full Time' },
    experienceLevel: { type: String, enum: ['Entry Level', 'Mid Level', 'Senior Level'], default: 'Entry Level' },
    salary: Number,
    requirements: [String],
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
