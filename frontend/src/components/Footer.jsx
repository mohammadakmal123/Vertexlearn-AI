import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-creator">
        {/* TODO: replace with your own name, degree, and contact email */}
        <div className="creator-avatar">YN</div>
        <div className="creator-info">
          <h4>MOHAMMAD AKMAL</h4>
          <p className="creator-role">Full-Stack Developer · Creator of VertexLearn AI</p>
          <p className="creator-meta">akmalakku692@gmail.com &nbsp;·&nbsp; PA COLLEGE OF ENGINEERING MANGALURU / AIML ENGINEERING
          </p>
        </div>
      </div>

      <div className="footer-cols">
        <div className="footer-col">
          <h5>VertexLearn AI</h5>
          <p>An AI-assisted Learning Management System built with the MERN stack, for personalized, interactive, and intelligent learning.</p>
        </div>
        <div className="footer-col">
          <h5>Course Catalog</h5>
          <Link to="/dashboard">All Courses</Link>
          <Link to="/dashboard">Artificial Intelligence</Link>
          <Link to="/dashboard">Web Development</Link>
          <Link to="/dashboard">Cloud Computing</Link>
        </div>
        <div className="footer-col">
          <h5>AI Tools</h5>
          <Link to="/dashboard">AI Tutor</Link>
          <Link to="/study-planner">AI Study Planner</Link>
          <Link to="/community">Discussion Forum</Link>
        </div>
        <div className="footer-col">
          <h5>Portals</h5>
          <Link to="/dashboard">Student Dashboard</Link>
          <Link to="/community">Instructor Studio</Link>
          <Link to="/community">Admin Management</Link>
        </div>
      </div>
    </footer>
  );
}
