import React from 'react';
import Login from './components/Login';
import Welcome from './components/Welcome';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Welcome /> : <Login />;
}

function App() {
  return (
    <AuthProvider>
      <div className="bg-white">
        <h1>My App</h1>
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;
