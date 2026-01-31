# Job Portal Application

A full-stack Job Portal built with the **MERN Stack** (MongoDB, Express, React, Node.js).

## 🚀 Features

### For Candidates
- **Browse Jobs**: Search by title, company, and filter by location, salary, and job type.
- **Apply**: Easy application process with resume upload (PDF).
- **Dashboard**: Track status of applications.
- **Profile**: Resume parsing automatically extracts skills and contact info.

### For Employers
- **Post Jobs**: Create detailed job listings.
- **Manage Applications**: View applicants and download resumes.
- **Company Profile**: Customize company information.

### Tech Stack
- **Frontend**: React (Vite), TailwindCSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JSON Web Tokens (JWT)

## 🛠️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/job-portal-app.git
    cd job-portal-app
    ```

2.  **Install Dependencies**
    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the `server` folder:
    ```env
    PORT=5001
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4.  **Run the App**
    ```bash
    # Run Server (Port 5001)
    cd server
    npm start

    # Run Client (Port 5175)
    cd client
    npm run dev
    ```

## 📸 Screenshots
*(Add your screenshots here)*

## 📄 License
This project is open source.
