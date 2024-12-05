import React from 'react';
import Header from './components/Header';
import ProductWheel from './components/ProductWheel';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <div className="container mx-auto px-4">
      <ProductWheel />
    </div>
  ) : (
    <div className="text-center p-4">Please login to continue!</div>
  );
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
