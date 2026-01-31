const fs = require('fs');
const pdf = require('pdf-parse');

const parseResume = async (filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);

        // Simple extraction logic (mocking advanced parsing)
        const text = data.text.toLowerCase();

        // Extract email (regex)
        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
        const emailMatch = text.match(emailRegex);
        const email = emailMatch ? emailMatch[0] : null;

        // Extract skills (keyword matching from a predefined list)
        const knownSkills = ['javascript', 'python', 'java', 'react', 'node', 'mongodb', 'sql', 'aws', 'docker'];
        const skills = knownSkills.filter(skill => text.includes(skill));

        return {
            text,
            email,
            skills
        };
    } catch (error) {
        console.error('Error parsing resume:', error);
        return { skills: [] };
    }
};

module.exports = { parseResume };
