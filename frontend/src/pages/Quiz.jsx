import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api.js';

export default function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/quizzes/course/${id}`)
      .then((res) => {
        setQuiz(res.data);
        setAnswers(new Array(res.data.questions.length).fill(null));
      })
      .catch(() => setError('No quiz available for this course yet.'));
  }, [id]);

  const selectAnswer = (qIndex, optIndex) => {
    const next = [...answers];
    next[qIndex] = optIndex;
    setAnswers(next);
  };

  const submit = async () => {
    const res = await api.post(`/quizzes/${quiz._id}/submit`, { answers });
    setResult(res.data);
  };

  if (error) return <p>{error}</p>;
  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="quiz">
      <h2>{quiz.title}</h2>
      {quiz.questions.map((q, i) => (
        <div key={i} className="quiz-question">
          <p><strong>{i + 1}. {q.question}</strong></p>
          {q.options.map((opt, j) => (
            <label key={j} className="quiz-option">
              <input
                type="radio"
                name={`q${i}`}
                checked={answers[i] === j}
                onChange={() => selectAnswer(i, j)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button className="btn" onClick={submit} disabled={answers.includes(null)}>Submit Quiz</button>

      {result && (
        <div className="quiz-result">
          <h3>Score: {result.score} / {result.total}</h3>
          <p>{result.feedback}</p>
        </div>
      )}
    </div>
  );
}
