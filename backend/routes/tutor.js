const express = require('express');
const router = express.Router();

// Lightweight rule-based "intelligent tutor" — keyword matching over a small
// knowledge base. This simulates the AI-tutor feature for the MVP; swap this
// route for a call to a real LLM API later without touching the frontend.
const knowledgeBase = [
  { keywords: ['react', 'component', 'jsx'], answer: 'React components are reusable, self-contained pieces of UI. Function components use hooks like useState and useEffect to manage state and side effects.' },
  { keywords: ['node', 'express', 'server'], answer: 'Express is a minimal Node.js framework for building APIs. Routes handle specific HTTP methods and paths, and middleware runs logic before your route handler (like checking auth).' },
  { keywords: ['mongodb', 'mongoose', 'database', 'schema'], answer: 'MongoDB stores data as JSON-like documents. Mongoose lets you define schemas in Node.js so your documents have a predictable structure, and it gives you easy query methods.' },
  { keywords: ['jwt', 'token', 'auth', 'login'], answer: 'JWT (JSON Web Token) is a signed token issued on login. The frontend stores it and sends it in the Authorization header; the backend verifies it to confirm who is making the request.' },
  { keywords: ['quiz', 'assessment', 'grade', 'score'], answer: 'Automated assessment compares a learner\u2019s submitted answers against stored correct answers and calculates a score instantly, without a human grader.' },
];

const fallback = "That's a great question — I don't have a specific answer prepared yet, but try breaking it into smaller pieces, or check the lesson content for related keywords.";

router.post('/ask', (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ message: 'question is required' });

  const lower = question.toLowerCase();
  const match = knowledgeBase.find(entry => entry.keywords.some(k => lower.includes(k)));

  res.json({ answer: match ? match.answer : fallback });
});

module.exports = router;
