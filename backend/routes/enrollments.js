const express = require('express');
const Enrollment = require('../models/Enrollment');
const auth = require('../middleware/auth');

const router = express.Router();

// Enroll current user in a course
router.post('/:courseId', auth, async (req, res) => {
  try {
    let enrollment = await Enrollment.findOne({ student: req.user.id, course: req.params.courseId });
    if (enrollment) return res.json(enrollment);
    enrollment = await Enrollment.create({ student: req.user.id, course: req.params.courseId });
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current user's enrollments (with course info)
router.get('/me', auth, async (req, res) => {
  const enrollments = await Enrollment.find({ student: req.user.id }).populate('course', 'title description category level');
  res.json(enrollments);
});

// Mark a lesson complete -> bump progress (personalization hook: could later
// use this data to recommend next lessons)
router.post('/:courseId/complete-lesson', auth, async (req, res) => {
  const { lessonIndex, totalLessons } = req.body;
  let enrollment = await Enrollment.findOne({ student: req.user.id, course: req.params.courseId });
  if (!enrollment) {
    enrollment = await Enrollment.create({ student: req.user.id, course: req.params.courseId });
  }
  if (!enrollment.completedLessons.includes(lessonIndex)) {
    enrollment.completedLessons.push(lessonIndex);
  }
  if (totalLessons) {
    enrollment.progress = Math.round((enrollment.completedLessons.length / totalLessons) * 100);
  }
  await enrollment.save();
  res.json(enrollment);
});

module.exports = router;
