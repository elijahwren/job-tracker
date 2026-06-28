# jobtrack — Job Application Tracker

A full stack MERN application to organize and track your entire job search pipeline, that I created for me and my friends for our job search.

🔗 **Demo:** [https://job-tracker-ekwren.vercel.app](https://job-tracker-ekwren.vercel.app/)

## Features

- **Authentication** — Secure register and login with JWT tokens and bcrypt password hashing
- **Application Management** — Add, edit, and delete job applications with full details
- **Status Tracking** — Track every application through Saved → Applied → Phone Screen → Interview → Offer → Rejected
- **Dashboard** — Live stats showing total applications, response rate, interviews, and offers
- **Status History** — Every status change is logged per application

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router v6
- Tailwind CSS
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

**Deployment**
- Frontend - Vercel
- Backend - Render
- Database - MongoDB Atlas

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account 

### 1. Clone the repo
```bash
git clone https://github.com/elijahwren/job-tracker.git
cd job-tracker
```

### 2. Set up the backend
```bash
cd server
npm install
cp .env.example .env
# Fill in your MONGO_URI and JWT_SECRET in .env
npm run dev
```

### 3. Set up the frontend
```bash
cd ../client
npm install
npm run dev
```
