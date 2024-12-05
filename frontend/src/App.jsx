import React from 'react';
import Welcome from './components/Welcome';
import Header from './components/Header';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  // Logic to be moved to routes in a larger app
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Welcome /> : <div>Please login to continue!</div>;
}

function App() {
  return (
    <AuthProvider>
      <div className="bg-white min-h-screen">
        <Header />
        <main className="p-4">
          <AppContent />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
