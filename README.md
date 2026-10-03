# VertexLearn AI — MVP (MERN Stack)

An AI-assisted Learning Management System MVP built with MongoDB, Express, React, and Node.js.

## What's implemented (fully working, real data)

| Feature | How it works |
|---|---|
| Auth | Register/login with JWT, passwords hashed with bcrypt |
| Course catalog | 6 seeded courses across categories (AI, Web Dev, Databases, Networks, Cloud), with search, category filter pills, difficulty filter, and sorting |
| Enrollment & progress | Per-student progress tracking stored in `Enrollment` — lessons completed and quiz scores are real, persisted data |
| Automated assessment | Multiple-choice quizzes auto-graded server-side the instant a student submits (`/api/quizzes/:id/submit`) |
| AI Tutor | A rule-based chatbot (`/api/tutor/ask`) answering common MERN/LMS questions — swap this route for a real LLM API call later without touching the frontend |
| Streaks | A genuine day-based login streak (`streakDays` on the `User` model), computed server-side from real login activity — not a fake counter |
| XP | Derived honestly from real quiz scores (10 XP per correct answer), calculated client-side from actual `Enrollment` data |
| Notifications | Built from real enrollment/quiz activity, not scripted fake content — shows an honest empty state if you haven't done anything yet |

## What's a "Coming soon" placeholder (and why)

The AI Study Planner, Community/Discussion Forum, Instructor Studio, and Admin Management pages exist as real routes in the app (so the navigation and footer links all work), but show a "Coming soon" message rather than fake functionality. These are genuinely multi-week features — a real AI study planner needs an LLM integration and scheduling logic, a community forum needs moderation and real-time infrastructure, and instructor/admin tools need a whole second permission system. Building fake versions of these would misrepresent what's actually working.

**Being upfront in your submission is a strength, not a weakness** — say explicitly which parts are fully functional vs. roadmap items. It shows you understand the difference between a demo and a production system, which reads far better to reviewers than overclaiming.

## Project structure

```
vertexlearn-ai/
  backend/          Express API + MongoDB (Mongoose)
    models/         User, Course, Quiz, Enrollment
    routes/         auth, courses, quizzes, enrollments, tutor
    middleware/      JWT auth check
    seed.js          Populates 2 sample courses + quizzes
    server.js
  frontend/         React app (Vite)
    src/pages/       Login, Register, Dashboard, CourseDetail, Quiz
    src/components/  Navbar, ProgressBar, ChatTutor
```

## Setup (do this in order)

### 0. Install prerequisites
- Node.js (v18+): https://nodejs.org
- A MongoDB database — easiest is a free MongoDB Atlas cluster: https://www.mongodb.com/cloud/atlas/register
  - Create a free cluster → Database Access (create a user/password) → Network Access (allow access from anywhere, `0.0.0.0/0`, for now) → "Connect" → "Drivers" → copy the connection string.

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
# open .env and paste your MongoDB connection string into MONGO_URI
# set JWT_SECRET to any random long string
npm run seed     # creates 2 sample courses + quizzes
npm run dev       # starts the API on http://localhost:5000
```

### 2. Frontend (in a new terminal)
```bash
cd frontend
npm install
npm run dev       # starts the app on http://localhost:5173
```

Open http://localhost:5173, register an account, and you'll see the seeded courses.

## What to submit to your internship portal

1. **Code**: push this whole folder to a GitHub repo (public or with the reviewer added as a collaborator).
2. **README**: this file already explains setup + what's implemented — keep it.
3. **Screenshots**: register/login screen, dashboard with courses, a lesson page, the quiz result, the AI tutor chat.
4. **Short write-up** (2-3 sentences per section): Tech stack used, features implemented, what you'd add with more time (real AI model integration, instructor dashboard, video lessons, discussion forums).
5. Optional but impressive: deploy it — backend on Render/Railway (free tier), frontend on Vercel/Netlify — and submit the live link too.

## Two-day build order (if you're doing this yourself instead of just running it)

**Day 1** — Get backend running locally, seed data, test all API routes with a tool like Postman/Thunder Client, then build Login/Register/Dashboard pages.

**Day 2** — Build CourseDetail + Quiz pages, wire up the AI Tutor widget, do a full click-through test, take screenshots, write the README notes, push to GitHub, submit.
