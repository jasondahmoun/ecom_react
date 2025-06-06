import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ADMIN = { username: 'UserAdmin', password: 'UserAdmin123.' };

const LoginAdmin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN.username && password === ADMIN.password) {
      login({ id: 0, username, email: '', password, name: { firstname: '', lastname: '' }, address: null as any, phone: '' }, 'admin-token', true);
      nav('/');
    } else {
      setError('Identifiants admin invalides');
    }
  };

  return (
    <div className="container">
      <h1>Connexion Administrateur</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
};

export default LoginAdmin;