import React from 'react';
import { LOGIN_URI } from '../api/spotify';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <button
        className="login-btn"
        color="green"
        onClick={() => window.open(LOGIN_URI, '_self')}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
