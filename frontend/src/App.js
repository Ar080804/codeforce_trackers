import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [handle, setHandle] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    if (!handle) return;
    
    try {
      setError('');
      setUserData(null);
      const response = await axios.get(`http://127.0.0.1:5000/api/user/${handle}`);
      setUserData(response.data);
    } catch (err) {
      setError('User not found. Check the spelling!');
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>🏆 Codeforces Tracker</h1>
      
      <input 
        type="text" 
        placeholder="Enter Handle (e.g. tourist)" 
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button 
        onClick={fetchUser} 
        style={{ padding: '10px 20px', fontSize: '16px', marginLeft: '10px', cursor: 'pointer', background: '#318ce7', color: 'white', border: 'none' }}
      >
        Search
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userData && (
        <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px auto', width: '300px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <img src={userData.avatar} alt="Avatar" style={{ borderRadius: '50%', width: '100px' }} />
          <h2>{userData.handle}</h2>
          <p><strong>Rank:</strong> {userData.rank}</p>
          <p><strong>Rating:</strong> {userData.rating}</p>
          <p style={{ color: 'gray' }}>Max Rating: {userData.maxRating}</p>
        </div>
      )}
    </div>
  );
}

export default App;
