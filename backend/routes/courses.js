const express = require('express');
const Course = require('../models/Course');
const auth = require('../middleware/auth');

const router = express.Router();

// Public: list all courses
router.get('/', async (req, res) => {
  const courses = await Course.find().select('title description category level createdAt');
  res.json(courses);
});

// Public: get one course with lessons
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
});

// Protected: create a course (any logged-in user, for demo purposes)
router.post('/', auth, async (req, res) => {
  const { title, description, category, level, lessons } = req.body;
  const course = await Course.create({
    title, description, category, level, lessons, createdBy: req.user.id,
  });
  res.status(201).json(course);
});

module.exports = router;
