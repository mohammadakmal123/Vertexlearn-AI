import React, { useState } from 'react';
import api from '../api.js';

export default function ChatTutor() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm your AI tutor. Ask me about React, Node, MongoDB, JWT auth, or quizzes." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const question = input;
    setMessages((m) => [...m, { from: 'user', text: question }]);
    setInput('');
    setLoading(true);
    try {
      const res = await api.post('/tutor/ask', { question });
      setMessages((m) => [...m, { from: 'bot', text: res.data.answer }]);
    } catch (err) {
      setMessages((m) => [...m, { from: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-tutor">
      <h3>AI Tutor</h3>
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble ${m.from}`}>{m.text}</div>
        ))}
        {loading && <div className="chat-bubble bot">Thinking...</div>}
      </div>
      <div className="chat-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask a question..."
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
