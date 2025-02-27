import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './Login';

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm">
      <h1 className="text-xl font-bold text-gray-800">Centigrade's Fake Store</h1>
      {isAuthenticated ? (
        <button
          onClick={logout}
          className="px-4 py-2 text-white bg-red-500 rounded transition-colors hover:bg-red-600"
        >
          Logout
        </button>
      ) : (
        <Login />
      )}
    </header>
  );
}

export default Header;
