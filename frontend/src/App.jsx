import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import Quiz from './pages/Quiz.jsx';
import ComingSoon from './pages/ComingSoon.jsx';

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="app">
      <Navbar user={user} onLogout={logout} />
      <div className="container">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/courses/:id" element={user ? <CourseDetail /> : <Navigate to="/login" />} />
          <Route path="/courses/:id/quiz" element={user ? <Quiz /> : <Navigate to="/login" />} />
          <Route path="/study-planner" element={user ? <ComingSoon title="AI Study Planner" description="A personalized day-by-day study schedule, generated from your course progress and goals. This feature is on the roadmap and isn't built yet." /> : <Navigate to="/login" />} />
          <Route path="/community" element={user ? <ComingSoon title="Community & Instructor Tools" description="Discussion forums, an instructor studio, and admin management are planned for a future release." /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      {user && <Footer />}
    </div>
  );
}

export default App;
