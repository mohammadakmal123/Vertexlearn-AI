import React from 'react';

export default function ProgressBar({ percent }) {
  return (
    <div className="progress-outer">
      <div className="progress-track">
        <div className="progress-inner" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress-label">{percent}%</span>
    </div>
  );
}
