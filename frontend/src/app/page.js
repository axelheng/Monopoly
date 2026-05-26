'use client'; 
import { useState, useEffect } from 'react';

export default function Home() {
  const [backendStatus, setBackendStatus] = useState("Connecting to backend...");

  useEffect(() => {
    // Fetch data from Node.js API server running on port 5000
      fetch('http://127.0.0.1:8080/api/health')
      .then((res) => res.json())
      .then((data) => {
        // Update our state with the message from the backend
        setBackendStatus(data.status);
      })
      .catch((err) => {
        console.error("Error fetching from backend:", err);
        setBackendStatus("Failed to connect to backend. Is it running?");
      });
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Monopoly Portfolio Tracker </h1>
      
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '8px', 
        marginTop: '1rem',
        border: '1px solid #ccc'
      }}>
        <strong>Backend Status:</strong> {backendStatus}
      </div>
    </main>
  );
}
