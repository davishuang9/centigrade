import React from 'react';
import Header from './components/Header';
import ProductWheel from './components/ProductWheel';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { isAuthenticated } = useAuth();
  // Would probably add routing and access to more entities here
  return isAuthenticated ? (
    <div className="container px-4 mx-auto">
      <ProductWheel />
    </div>
  ) : (
    <div className="p-4 text-center">Please login to continue!</div>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main className="p-4">
          <AppContent />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
