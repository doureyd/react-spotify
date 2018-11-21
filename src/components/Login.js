import React from 'react';
import { LOGIN_URI } from '../api/spotify';

function Login() {
  return (
    <div className="login">
      <a href={LOGIN_URI}>Login with Spotify</a>
    </div>
  );
}

export default Login;
