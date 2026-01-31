const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const User = require('./models/User'); // Required for population

dotenv.config();

const fs = require('fs'); // Added fs

const testQuery = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        console.log('Attempting to fetch jobs...');
        const jobs = await Job.find().populate('company', 'username email');
        console.log('Success! Found', jobs.length, 'jobs.');
        fs.writeFileSync('success.log', `Found ${jobs.length} jobs`);
    } catch (error) {
        console.error('ERROR CAUSING 500:', error);
        fs.writeFileSync('error.log', error.stack || error.toString());
    } finally {
        await mongoose.disconnect();
    }
};

testQuery();
