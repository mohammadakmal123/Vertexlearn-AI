import React, { useEffect, useState, useRef } from 'react';
import api from '../api.js';

// Notifications are derived from the user's REAL enrollment and quiz data —
// not fabricated placeholder content. If there's no real activity yet,
// the panel honestly shows an empty state instead of fake items.
export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    api.get('/enrollments/me').then((res) => {
      const notifs = [];
      res.data.forEach((enr) => {
        const courseTitle = enr.course?.title || 'a course';
        notifs.push({ title: `Enrolled in ${courseTitle}`, meta: new Date(enr.createdAt).toLocaleDateString() });
        (enr.quizScores || []).forEach((qs) => {
          notifs.push({ title: `Scored ${qs.score}/${qs.total} on a quiz in ${courseTitle}`, meta: 'Quiz result' });
        });
      });
      setItems(notifs.slice(0, 6));
    }).catch(() => {});
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="bell-wrap" ref={ref}>
      <button className="bell-btn" onClick={() => setOpen((o) => !o)} aria-label="Notifications">
        🔔
        {items.length > 0 && <span className="bell-dot">{items.length}</span>}
      </button>
      {open && (
        <div className="notif-panel">
          <h4>Notifications</h4>
          {items.length === 0 && <p className="notif-empty">No activity yet — enroll in a course or take a quiz to see updates here.</p>}
          {items.map((n, i) => (
            <div key={i} className="notif-item">
              <div className="notif-title">{n.title}</div>
              <div className="notif-meta">{n.meta}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
