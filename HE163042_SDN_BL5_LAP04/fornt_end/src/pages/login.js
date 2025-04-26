import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Lưu token vào localStorage
      alert('Login successful');
      navigate('/create'); // Điều hướng đến trang tạo project
    } catch (error) {
      alert('Login failed. Please check your login information.');
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', padding: '20px'}}>
      <h1 className="text-center mb-4">Login</h1>
      <form style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '20px',paddingBottom: '50px' }} onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
