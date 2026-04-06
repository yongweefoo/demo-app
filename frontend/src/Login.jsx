import { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const data = await res.json();
      onLogin(data);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: '80px auto', padding: 32, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Task Manager — Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <button onClick={handleSubmit} style={{ width: '100%', padding: 10, background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4 }}>
          Login
        </button>
      </div>
    </div>
  );
}