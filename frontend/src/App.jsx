import { useState } from 'react';
import Login from './Login';
import Tasks from './Tasks';

export default function App() {
  const [user, setUser] = useState(null);
  return user
    ? <Tasks user={user} onLogout={() => setUser(null)} />
    : <Login onLogin={setUser} />;
}