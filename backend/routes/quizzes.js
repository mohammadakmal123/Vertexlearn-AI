const express = require('express');
const Quiz = require('../models/Quiz');
const Enrollment = require('../models/Enrollment');
const auth = require('../middleware/auth');

const router = express.Router();

// Get quiz for a course (hide correct answers)
router.get('/course/:courseId', async (req, res) => {
  const quiz = await Quiz.findOne({ course: req.params.courseId });
  if (!quiz) return res.status(404).json({ message: 'No quiz for this course yet' });
  const safe = {
    _id: quiz._id,
    title: quiz.title,
    questions: quiz.questions.map(q => ({ question: q.question, options: q.options })),
  };
  res.json(safe);
});

// Submit answers -> auto-grade (this is the "automated assessment" feature)
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const { answers } = req.body; // array of selected option indices
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) score += 1;
    });
    const total = quiz.questions.length;

    let enrollment = await Enrollment.findOne({ student: req.user.id, course: quiz.course });
    if (!enrollment) {
      enrollment = await Enrollment.create({ student: req.user.id, course: quiz.course });
    }
    enrollment.quizScores.push({ quiz: quiz._id, score, total });
    // simple progress bump on quiz completion
    enrollment.progress = Math.min(100, enrollment.progress + 20);
    await enrollment.save();

    res.json({ score, total, feedback: score / total >= 0.7 ? 'Great job! You have a strong grasp of this topic.' : 'Consider reviewing the lesson material before moving on.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
