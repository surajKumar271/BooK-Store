import React, { useState } from 'react';
import axios from 'axios';
import './register.css';


export default function Register({ onRegistered }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/register', {
        name,
        username,
        email,
        password
      });
      setMsg(res.data.msg);
      onRegistered && onRegistered(); // go back to login
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Register for BookStore</h2>
        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
      </div>
    </div>
  );
}
