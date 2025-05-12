import React from 'react';
import '../App.css';

export default function Login() {
  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100">
      <div className="login-card p-4 rounded shadow">
        <h2 className="login-title text-center mb-4 ">Login for Faster <br/>Transaction</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" required />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn login-btn">Login</button>
          </div>
        </form>
        <p className='text-center mt-3'>
        <a className="login-footer text-center mt-3" href='/forgot'>Forgot your password?</a>
        </p>
      </div>
    </div>
  );
}
