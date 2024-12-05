import React from 'react';
import { useAuth } from '../context/AuthContext';

function Welcome() {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Welcome to Centigrade!</h1>
      <p>You are now logged in.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Welcome;
