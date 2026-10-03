import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api.js';
import ProgressBar from '../components/ProgressBar.jsx';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);

  useEffect(() => {
    api.get(`/courses/${id}`).then((res) => setCourse(res.data));
    api.get('/enrollments/me').then((res) => {
      const found = res.data.find((e) => e.course?._id === id);
      setEnrollment(found || null);
    });
  }, [id]);

  const completeLesson = async (index) => {
    const res = await api.post(`/enrollments/${id}/complete-lesson`, {
      lessonIndex: index,
      totalLessons: course.lessons.length,
    });
    setEnrollment(res.data);
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="course-detail">
      <div className="course-detail-hero">
        <div className="course-detail-thumb" style={{ backgroundImage: `url(${course.thumbnail})` }} />
        <div>
          <h2>{course.title}</h2>
          <p className="tag">{course.level} in {course.category}</p>
          <p>{course.description}</p>
          <div className="instructor-row">
            <span>👤 {course.instructorName} — {course.instructorTitle}</span>
            <span>·</span>
            <span>⭐ {course.rating}</span>
            <span>·</span>
            <span>{course.durationHours}h</span>
          </div>
        </div>
      </div>
      {enrollment && <ProgressBar percent={enrollment.progress} />}

      <h3>Lessons</h3>
      <div className="lesson-list">
        {course.lessons.map((lesson, i) => {
          const done = enrollment?.completedLessons?.includes(i);
          return (
            <div key={i} className="lesson-card">
              <h4>{i + 1}. {lesson.title} {done && '✅'}</h4>
              <p>{lesson.content}</p>
              {!done && <button onClick={() => completeLesson(i)}>Mark complete</button>}
            </div>
          );
        })}
      </div>

      <Link to={`/courses/${id}/quiz`} className="btn">Take the quiz</Link>
    </div>
  );
}
