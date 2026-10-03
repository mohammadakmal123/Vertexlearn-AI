# VertexLearn AI

An AI-assisted Learning Management System (LMS) built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

| Feature | How it works |
| --- | --- |
| Authentication | Register and login with JWT; passwords hashed with bcrypt |
| Course catalog | 6 seeded courses with search, category filters, difficulty filter, and sorting |
| Enrollment and progress | Per-student lesson progress and quiz scores stored in MongoDB |
| Quizzes | Multiple-choice quizzes auto-graded on the server at submission |
| AI Tutor | Rule-based chatbot (`/api/tutor/ask`); can be replaced with an LLM API call without changing the frontend |
| Streaks | Day-based login streak computed server-side |
| XP | Calculated from real quiz scores (10 XP per correct answer) |
| Notifications | Generated from real enrollment and quiz activity |

## Roadmap (placeholder pages)

AI Study Planner, Community Forum, Instructor Studio, and Admin Management exist as routes and show a "Coming soon" message. They are planned features and are not implemented yet.

## Tech Stack

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB Atlas (Mongoose)
- Auth: JSON Web Tokens, bcrypt

## Project Structure

```
vertexlearn-ai/
  backend/
    models/        User, Course, Quiz, Enrollment
    routes/        auth, courses, quizzes, enrollments, tutor
    middleware/    JWT auth check
    utils/         streak logic
    seed.js        seeds 6 courses and 3 quizzes
    server.js
  frontend/
    src/pages/       Login, Register, Dashboard, CourseDetail, Quiz, ComingSoon
    src/components/  Navbar, Footer, NotificationBell, ProgressBar, ChatTutor
```

## Setup

Requirements: Node.js 18+ and a free MongoDB Atlas cluster.

### Backend

```
cd backend
npm install
copy .env.example .env      (on Mac/Linux: cp .env.example .env)
```

Open `.env` and set `MONGO_URI` to your Atlas connection string and `JWT_SECRET` to any long random string. Then:

```
npm run seed
npm run dev
```

The API runs on http://localhost:5000.

### Frontend (new terminal)

```
cd frontend
npm install
npm run dev
```

Open http://localhost:5173, register an account, and browse the courses.

## Author

MOHAMMAD AKMAL , B.E. Artificial Intelligence and Machine Learning, P.A. College of Engineering, Mangaluru