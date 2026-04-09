import { useState, useEffect } from 'react';


export default function Tasks({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(r => r.json())
      .then(setTasks);
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask, status: 'pending' }),
    });
    const task = await res.json();
    setTasks(prev => [...prev, task]);
    setNewTask('');
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Tasks — Welcome, {user.username}</h2>
        <button onClick={onLogout}>Logout</button>
      </div>

      {/* This is basically a table — great talking point for Excel users */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ padding: 8, textAlign: 'left' }}>Title</th>
            <th style={{ padding: 8, textAlign: 'left' }}>Status</th>
            // Add to table headers
            <th style={{ padding: 8, textAlign: 'left' }}>Priority</th>  {/* ← INSERT HERE */}
            <th style={{ padding: 8, textAlign: 'left' }}>Created</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 8 }}>{t.title}</td>
              <td style={{ padding: 8 }}>{t.status}</td>
              // Add to table rows
              <td style={{ padding: 8 }}>
                <span style={{
                  background: t.priority === 'high' ? '#ffebeb' : '#ebf5eb',
                  color: t.priority === 'high' ? '#cc0000' : '#006600',
                  padding: '2px 8px', borderRadius: 12, fontSize: 12
                }}>
                  {t.priority || 'normal'}
                </span>
              </td>
              <td style={{ padding: 8 }}>{t.createdAt?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <input value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="New task title..." style={{ flex: 1, padding: 8 }} />
        <button onClick={addTask} style={{ padding: '8px 16px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4 }}>Add</button>
      </div>
    </div>
  );
}