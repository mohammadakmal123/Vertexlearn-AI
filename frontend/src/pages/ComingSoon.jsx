import React from 'react';
import { Link } from 'react-router-dom';

export default function ComingSoon({ title, description }) {
  return (
    <div className="coming-soon">
      <span className="eyebrow">✦ Coming soon</span>
      <h2>{title}</h2>
      <p>{description}</p>
      <p style={{ marginTop: 24 }}>
        <Link to="/dashboard" className="btn btn-outline">Back to courses</Link>
      </p>
    </div>
  );
}
