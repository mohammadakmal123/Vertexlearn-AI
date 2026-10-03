import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';
import ProgressBar from '../components/ProgressBar.jsx';
import ChatTutor from '../components/ChatTutor.jsx';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const [sort, setSort] = useState('popular');

  useEffect(() => {
    api.get('/courses').then((res) => setCourses(res.data));
    refreshEnrollments();
  }, []);

  const refreshEnrollments = () => {
    api.get('/enrollments/me').then((res) => setEnrollments(res.data));
  };

  const enrollmentFor = (courseId) => enrollments.find((e) => e.course?._id === courseId);

  const enroll = async (courseId) => {
    await api.post(`/enrollments/${courseId}`);
    refreshEnrollments();
  };

  const totalXP = useMemo(() => {
    return enrollments.reduce((sum, e) => sum + (e.quizScores || []).reduce((s, q) => s + q.score * 10, 0), 0);
  }, [enrollments]);

  const categories = useMemo(() => ['All', ...new Set(courses.map((c) => c.category))], [courses]);

  const filtered = useMemo(() => {
    let list = courses.filter((c) => {
      const matchesSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || c.category === category;
      const matchesLevel = level === 'All' || c.level === level;
      return matchesSearch && matchesCategory && matchesLevel;
    });
    if (sort === 'rating') list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sort === 'newest') list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return list;
  }, [courses, search, category, level, sort]);

  return (
    <div>
      <div className="catalog-hero">
        <span className="eyebrow">📖 Interactive Course Catalog</span>
        <h1>Explore Industry-Grade Masterclasses</h1>
        <p className="subtext">From foundational programming to cutting-edge AI, databases, networks, and cloud systems — build real, job-ready skills.</p>
        <div className="search-bar">
          <span>🔍</span>
          <input
            placeholder="Search by title or topic (e.g. 'React', 'AI', 'Networks')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="pill-row">
          {categories.map((c) => (
            <button key={c} className={`pill ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
      </div>

      <div className="catalog-layout">
        <aside className="filters-col">
          <h4>Difficulty Level</h4>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lv) => (
            <label key={lv} className={`radio-row ${level === lv ? 'active-filter' : ''}`}>
              <input type="radio" name="level" checked={level === lv} onChange={() => setLevel(lv)} />
              {lv}
            </label>
          ))}
        </aside>

        <main className="catalog-main">
          <div className="catalog-meta">
            <span>Showing {filtered.length} course{filtered.length !== 1 ? 's' : ''}</span>
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="popular">Sort: Most Popular</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="newest">Sort: Newest</option>
            </select>
          </div>

          <div className="course-grid">
            {filtered.map((c) => {
              const enr = enrollmentFor(c._id);
              return (
                <div key={c._id} className="course-card">
                  <div className="course-thumb" style={{ backgroundImage: `url(${c.thumbnail})` }}>
                    <div className="course-badges">
                      <span className="badge-chip">{c.category}</span>
                      <span className="badge-chip level">{c.level}</span>
                    </div>
                    <span className="course-rating">⭐ {c.rating}</span>
                  </div>
                  <div className="course-card-body">
                    <h3>{c.title}</h3>
                    <p>{c.description}</p>
                    <div className="course-meta-row">
                      <span>{c.instructorName}</span>
                      <span>·</span>
                      <span>{c.durationHours}h</span>
                    </div>
                    {enr && <ProgressBar percent={enr.progress} />}
                    <div className="course-footer">
                      {enr ? (
                        <Link to={`/courses/${c._id}`} className="btn">Continue</Link>
                      ) : (
                        <button className="btn" onClick={() => enroll(c._id)}>Enroll</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && <p>No courses match your filters yet.</p>}
          </div>
        </main>

        <div className="side-col">
          <div className="xp-card">
            <h4>Your XP</h4>
            <div className="xp-value">{totalXP}</div>
            <div className="xp-sub">Earned from quiz performance</div>
          </div>
          <ChatTutor />
        </div>
      </div>
    </div>
  );
}
