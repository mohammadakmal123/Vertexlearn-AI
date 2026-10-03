import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationBell from './NotificationBell.jsx';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand">
          <span className="brand-icon">✦</span>
          <span className="brand-text">
            <span className="brand-name">VERTEX<span>LEARN</span> AI</span>
            <span className="brand-tagline">LEARN SMARTER. GROW FASTER.</span>
          </span>
        </Link>
        {user && (
          <div className="nav-links">
            <Link to="/dashboard">Explore Courses</Link>
            <Link to="/dashboard">AI Tutor <span className="nav-badge">AI</span></Link>
            <Link to="/study-planner">AI Study Planner</Link>
            <Link to="/community">Community</Link>
          </div>
        )}
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/dashboard" className="nav-search">🔍 Search courses...</Link>
            <span className="pill-badge flame">🔥 {user.streakDays ?? 0}d</span>
            <span className="pill-badge role">⚡ Student</span>
            <NotificationBell />
            <span className="hello">Hi, {user.name}</span>
            <button className="btn-link" onClick={() => { onLogout(); navigate('/login'); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn" style={{ padding: '8px 16px' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
