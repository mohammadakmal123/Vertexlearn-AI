const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  lessons: [lessonSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  thumbnail: String,
  rating: { type: Number, default: 4.8 },
  durationHours: { type: Number, default: 10 },
  instructorName: { type: String, default: 'VertexLearn Faculty' },
  instructorTitle: { type: String, default: 'Course Instructor' },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
