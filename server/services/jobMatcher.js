const Job = require('../models/Job');
const User = require('../models/User');

const matchJobs = async (userId) => {
    const user = await User.findById(userId);
    if (!user || !user.profile.skills) return [];

    const jobs = await Job.find();

    const matchedJobs = jobs.map(job => {
        const requiredSkills = job.requirements || []; // Assume requirements is array of strings
        if (requiredSkills.length === 0) return { job, score: 0 };

        const matchingSkills = requiredSkills.filter(req =>
            user.profile.skills.some(userSkill => userSkill.toLowerCase().includes(req.toLowerCase()))
        );

        const score = (matchingSkills.length / requiredSkills.length) * 100;
        return { job, score };
    }).filter(match => match.score > 0).sort((a, b) => b.score - a.score);

    return matchedJobs;
};

module.exports = { matchJobs };
