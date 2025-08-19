import React, { useState } from 'react';
import API from '../components/api';
import { useNavigate } from 'react-router-dom';

export default function HRLogin(){
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setMsg('Logged in ✅');
      nav('/hr/panel');
    } catch (e) {
      setMsg(e.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="title mb-4">Admin (HR) Login</h2>
      <form onSubmit={login} className="grid gap-3">
        <label className="label">Email</label>
        <input className="input" placeholder="admin@example.com" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <label className="label">Password</label>
        <input className="input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} required/>
        <button className="btn-primary mt-2" type="submit">Login</button>
      </form>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
}
