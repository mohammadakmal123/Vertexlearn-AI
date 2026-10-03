require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');
const Quiz = require('./models/Quiz');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected. Clearing old data...');
  await Course.deleteMany({});
  await Quiz.deleteMany({});

  const courses = await Course.insertMany([
    {
      title: 'Introduction to the MERN Stack',
      description: 'Learn the fundamentals of MongoDB, Express, React, and Node.js by building a real app.',
      category: 'Web Development',
      level: 'Beginner',
      rating: 4.8,
      durationHours: 12,
      instructorName: 'Priya Nair',
      instructorTitle: 'Full-Stack Engineer',
      thumbnail: 'https://picsum.photos/seed/mern-stack/640/400',
      lessons: [
        { title: 'What is the MERN stack?', content: 'MERN stands for MongoDB, Express, React, and Node.js — a set of technologies used together to build full-stack JavaScript web applications. MongoDB stores your data, Express and Node build the backend API, and React builds the frontend UI.' },
        { title: 'Setting up a Node/Express server', content: 'An Express server listens for HTTP requests (GET, POST, etc.) on defined routes and sends back responses, usually as JSON.' },
        { title: 'Connecting to MongoDB with Mongoose', content: 'Mongoose lets you define a schema for your data (e.g., a User has a name, email, password) and gives you methods to create, read, update, and delete documents.' },
        { title: 'Building UI with React', content: 'React lets you build UIs out of reusable components. State (useState) controls what\u2019s shown, and props pass data between components.' },
      ],
    },
    {
      title: 'Building REST APIs',
      description: 'Design and build clean, secure REST APIs with Express and JWT authentication.',
      category: 'Web Development',
      level: 'Intermediate',
      rating: 4.7,
      durationHours: 9,
      instructorName: 'Daniel Osei',
      instructorTitle: 'Backend Architect',
      thumbnail: 'https://picsum.photos/seed/rest-apis/640/400',
      lessons: [
        { title: 'REST principles', content: 'REST APIs organize functionality around resources (like /courses or /users) and use HTTP methods to act on them.' },
        { title: 'Authentication with JWT', content: 'JSON Web Tokens let your server verify who a user is on every request, without storing session state on the server.' },
      ],
    },
    {
      title: 'Foundations of Artificial Intelligence',
      description: 'Get a working understanding of how modern AI systems learn, reason, and generate predictions.',
      category: 'Artificial Intelligence',
      level: 'Beginner',
      rating: 4.9,
      durationHours: 14,
      instructorName: 'Dr. Elena Rostova',
      instructorTitle: 'AI Research Lead',
      thumbnail: 'https://picsum.photos/seed/ai-foundations/640/400',
      lessons: [
        { title: 'What is machine learning?', content: 'Machine learning is a way of programming computers to find patterns in data and make predictions, instead of following rules a human wrote by hand.' },
        { title: 'Supervised vs. unsupervised learning', content: 'Supervised learning trains on labeled examples (input + correct answer). Unsupervised learning finds structure in data with no labels at all.' },
        { title: 'What a neural network actually does', content: 'A neural network is a stack of simple math functions, layered together, that gradually adjust their internal numbers (weights) to get better at a task through training.' },
      ],
    },
    {
      title: 'Databases & Data Modeling',
      description: 'Learn how to design schemas, write efficient queries, and choose between SQL and NoSQL.',
      category: 'Database',
      level: 'Advanced',
      rating: 4.6,
      durationHours: 11,
      instructorName: 'Marcus Webb',
      instructorTitle: 'Data Platform Engineer',
      thumbnail: 'https://picsum.photos/seed/databases/640/400',
      lessons: [
        { title: 'SQL vs. NoSQL', content: 'SQL databases (like PostgreSQL) store data in rigid tables with relationships. NoSQL databases (like MongoDB) store flexible, document-shaped data — better suited to fast-changing app data.' },
        { title: 'Indexing for performance', content: 'An index lets a database find rows/documents without scanning every single one, the same way a book index lets you skip straight to a page.' },
      ],
    },
    {
      title: 'Computer Networks Essentials',
      description: 'Understand how data actually travels across the internet, from your browser to a server and back.',
      category: 'Computer Networks',
      level: 'Intermediate',
      rating: 4.7,
      durationHours: 10,
      instructorName: 'Ana Kowalski',
      instructorTitle: 'Network Systems Engineer',
      thumbnail: 'https://picsum.photos/seed/networks/640/400',
      lessons: [
        { title: 'How the internet routes data', content: 'Data is broken into small packets, each one independently routed across multiple networks, then reassembled in order at the destination.' },
        { title: 'HTTP and HTTPS', content: 'HTTP is the protocol browsers and servers use to exchange requests and responses. HTTPS adds encryption so that data can\u2019t be read or tampered with in transit.' },
      ],
    },
    {
      title: 'Cloud Computing Fundamentals',
      description: 'Learn the core concepts behind deploying and scaling applications on the cloud.',
      category: 'Cloud Computing',
      level: 'Beginner',
      rating: 4.8,
      durationHours: 8,
      instructorName: 'Oliver Thorne',
      instructorTitle: 'Cloud Infrastructure Architect',
      thumbnail: 'https://picsum.photos/seed/cloud-computing/640/400',
      lessons: [
        { title: 'What "the cloud" actually is', content: 'Cloud computing means renting computing power, storage, and services from a provider\u2019s data centers, instead of buying and maintaining your own physical servers.' },
        { title: 'Containers, in plain terms', content: 'A container packages an app with everything it needs to run, so it behaves the same on your laptop as it does on a server.' },
      ],
    },
  ]);

  const [mern, rest, ai] = courses;

  await Quiz.create({
    course: mern._id,
    title: 'MERN Basics Quiz',
    questions: [
      { question: 'What does the "M" in MERN stand for?', options: ['MySQL', 'MongoDB', 'Meteor', 'Mocha'], correctIndex: 1 },
      { question: 'Which library is used to build the frontend UI in MERN?', options: ['Angular', 'Vue', 'React', 'Svelte'], correctIndex: 2 },
      { question: 'What does Mongoose provide?', options: ['CSS styling', 'A schema layer for MongoDB', 'A testing framework', 'A build tool'], correctIndex: 1 },
    ],
  });

  await Quiz.create({
    course: rest._id,
    title: 'REST API Quiz',
    questions: [
      { question: 'What does JWT stand for?', options: ['Java Web Token', 'JSON Web Token', 'Just Web Text', 'Joint Web Transfer'], correctIndex: 1 },
      { question: 'Which HTTP method is typically used to create a resource?', options: ['GET', 'POST', 'DELETE', 'OPTIONS'], correctIndex: 1 },
    ],
  });

  await Quiz.create({
    course: ai._id,
    title: 'AI Foundations Quiz',
    questions: [
      { question: 'What is supervised learning?', options: ['Training with no data', 'Training on labeled examples', 'Training only neural networks', 'A type of database'], correctIndex: 1 },
      { question: 'What does a neural network learn during training?', options: ['Its internal weights', 'The programming language', 'The operating system', 'The database schema'], correctIndex: 0 },
    ],
  });

  console.log(`Seed complete: ${courses.length} courses + 3 quizzes created.`);
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
