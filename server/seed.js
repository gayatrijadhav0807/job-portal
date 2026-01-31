const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const jobs = [
    {
        title: "Frontend Developer",
        description: "We are looking for a skilled React developer to join our team. Experience with TailwindCSS is a plus.",
        location: "San Francisco, CA",
        jobType: "Full Time",
        experienceLevel: "Mid Level",
        salary: 120000,
        requirements: ["React", "JavaScript", "CSS"]
    },
    {
        title: "Backend Engineer",
        description: "Join our backend team to build scalable APIs using Node.js and MongoDB.",
        location: "Remote",
        jobType: "Remote",
        experienceLevel: "Senior Level",
        salary: 150000,
        requirements: ["Node.js", "MongoDB", "Express"]
    },
    {
        title: "UI/UX Designer",
        description: "Creative designer needed to shape the user experience of our product.",
        location: "New York, NY",
        jobType: "Contract",
        experienceLevel: "Mid Level",
        salary: 90000,
        requirements: ["Figma", "Adobe XD", "Prototyping"]
    },
    {
        title: "Junior Data Analyst",
        description: "Analyze data trends and help drive business decisions.",
        location: "Chicago, IL",
        jobType: "Full Time",
        experienceLevel: "Entry Level",
        salary: 70000,
        requirements: ["SQL", "Python", "Tableau"]
    },
    {
        title: "DevOps Engineer",
        description: "Manage our cloud infrastructure and CI/CD pipelines.",
        location: "Austin, TX",
        jobType: "Full Time",
        experienceLevel: "Senior Level",
        salary: 140000,
        requirements: ["AWS", "Docker", "Kubernetes"]
    },
    {
        title: "Content Writer",
        description: "Write engaging content for our blog and marketing materials.",
        location: "Remote",
        jobType: "Part Time",
        experienceLevel: "Entry Level",
        salary: 40000,
        requirements: ["Writing", "SEO", "Editing"]
    },
    {
        title: "Product Manager",
        description: "Lead the product vision and work closely with engineering teams.",
        location: "Seattle, WA",
        jobType: "Full Time",
        experienceLevel: "Senior Level",
        salary: 160000,
        requirements: ["Product Management", "Agile", "Communication"]
    },
    {
        title: "Mobile App Developer",
        description: "Build high-performance mobile apps using React Native.",
        location: "Los Angeles, CA",
        jobType: "Contract",
        experienceLevel: "Mid Level",
        salary: 110000,
        requirements: ["React Native", "iOS", "Android"]
    },
    {
        title: "QA Engineer",
        description: "Ensure the quality of our software through automated testing.",
        location: "Boston, MA",
        jobType: "Full Time",
        experienceLevel: "Mid Level",
        salary: 95000,
        requirements: ["Selenium", "JavaScript", "Testing"]
    },
    {
        title: "Marketing Specialist",
        description: "Execute marketing campaigns and track performance.",
        location: "Remote",
        jobType: "Remote",
        experienceLevel: "Entry Level",
        salary: 60000,
        requirements: ["Marketing", "Social Media", "Analytics"]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Clear existing data
        await Job.deleteMany({});
        await User.deleteMany({});
        console.log('Cleared existing data');

        // Create Admin/Employer User
        const hashedPassword = await bcrypt.hash('password123', 10);
        const employer = await User.create({
            username: "TechCorp",
            email: "employer@techcorp.com",
            password: hashedPassword,
            role: "employer"
        });
        console.log('Created Employer User');

        // Insert Jobs
        const jobsWithCompany = jobs.map(job => ({
            ...job,
            company: employer._id
        }));

        await Job.insertMany(jobsWithCompany);
        console.log('Seeded Jobs');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDB();
