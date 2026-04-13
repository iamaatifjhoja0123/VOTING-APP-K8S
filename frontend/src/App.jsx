import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

const API_URL = 'http://localhost:5000';

function App() {
  const [scores, setScores] = useState({ AWS: 0, Azure: 0 });
  const [loading, setLoading] = useState(false);

  const fetchScores = async () => {
    try {
      const response = await axios.get(`${API_URL}/results`);
      setScores({
        AWS: response.data.AWS || 0,
        Azure: response.data.Azure || 0
      });
    } catch (error) {
      console.error("Error fetching scores:", error.message);
    }
  };

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 2000); 
    return () => clearInterval(interval);
  }, []);

  const handleVote = async (candidate) => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/vote`, { candidate });
      fetchScores();
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => setLoading(false), 500); 
  };

  // Math for Progress Bar
  const totalVotes = scores.AWS + scores.Azure;
  const awsPercent = totalVotes === 0 ? 50 : Math.round((scores.AWS / totalVotes) * 100);
  const azurePercent = totalVotes === 0 ? 50 : 100 - awsPercent;

  return (
    <div className="app-container">
      <div className="glass-card">
        <header className="header">
          <span className="icon">☁️</span>
          {}
          <h1 style={{ lineHeight: '1.4', paddingBottom: '10px' }}>The Cloud War</h1>
          <p>Choose your preferred Cloud Infrastructure</p>
        </header>

        <div className="voting-section">
          <button 
            className={`vote-btn aws-btn ${loading ? 'disabled' : ''}`}
            onClick={() => handleVote('AWS')} 
            disabled={loading}
          >
            <div className="btn-content">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="provider-logo" />
              <span>Vote AWS</span>
            </div>
          </button>
          
          <button 
            className={`vote-btn azure-btn ${loading ? 'disabled' : ''}`}
            onClick={() => handleVote('Azure')} 
            disabled={loading}
          >
            <div className="btn-content">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg" alt="Azure" className="provider-logo" />
              <span>Vote Azure</span>
            </div>
          </button>
        </div>

        <div className="stats-section">
          <h2>Live Results</h2>
          <p className="total-votes">Total Votes: {totalVotes}</p>
          
          <div className="progress-container">
            <div className="progress-bar-wrapper">
              <div 
                className="progress-fill aws-fill" 
                style={{ width: `${awsPercent}%` }}
              >
                {awsPercent > 10 && <span className="percent-text">{awsPercent}%</span>}
              </div>
              <div 
                className="progress-fill azure-fill" 
                style={{ width: `${azurePercent}%` }}
              >
                {azurePercent > 10 && <span className="percent-text">{azurePercent}%</span>}
              </div>
            </div>
            
            <div className="score-labels">
              <span className="aws-score">AWS: {scores.AWS}</span>
              <span className="azure-score">Azure: {scores.Azure}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;