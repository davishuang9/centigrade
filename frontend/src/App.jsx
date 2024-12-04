import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [health, setHealth] = useState('Loading...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('http://localhost:8000/health');
        const data = await response.json();
        setHealth(data.status);
        setError(null);
      } catch (err) {
        setError('Failed to connect to backend');
        setHealth('Unknown');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Backend Status Monitor</h1>
        <div className={`status-indicator ${health === 'healthy' ? 'healthy' : 'unhealthy'}`}>
          <p>Status: {health}</p>
          {error && <p className="error">{error}</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
