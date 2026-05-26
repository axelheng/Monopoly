'use client';
import { useState } from 'react';

export default function Home() {
  // === STATE DECLARATIONS ===
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [ticker, setTicker] = useState('');
  const [type, setType] = useState('BUY');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [tradeMessage, setTradeMessage] = useState('');
  const [isTradeError, setIsTradeError] = useState(false);

  // === DESIGN THEME LOGIC ===
  const themeColor = type === 'BUY' ? '#22c55e' : '#ef4444';
  const bgColorLight = type === 'BUY' ? '#f0fdf4' : '#fef2f2';

  // === SUBMISSION HANDLERS ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await fetch(`http://127.0.0.1:8080${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (isLoginMode) {
        setLoggedInUser(data.user);
        setMessage(`Welcome back, ${data.user.email}!`);
      } else {
        setMessage('Success! Account created. You can now toggle to Log In.');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    }
  };

  const handleLogTransaction = async (e) => {
    e.preventDefault();
    setTradeMessage('');
    setIsTradeError(false);

    try {
      const response = await fetch('http://127.0.0.1:8080/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: loggedInUser.id,
          ticker,
          type,
          quantity: parseFloat(quantity),
          price: parseFloat(price),
          transaction_date: date
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save trade');
      }

      setIsTradeError(false);
      setTradeMessage(`Logged: ${data.transaction.type} ${data.transaction.quantity} shares of ${data.transaction.ticker}`);
      
      setTicker('');
      setQuantity('');
      setPrice('');
      setDate('');
    } catch (err) {
      setIsTradeError(true);
      setTradeMessage(err.message);
    }
  };

  // === RENDER ROUTER ===
  if (loggedInUser) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center' }}>Monopoly Dashboard</h1>
        <p style={{ textAlign: 'center' }}>Logged in as: <strong>{loggedInUser.email}</strong> (ID: {loggedInUser.id})</p>
        
        <hr style={{ margin: '2rem 0', borderColor: '#eaeaea' }} />

        <h3>Log a Stock Transaction</h3>
        <form onSubmit={handleLogTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Stock Ticker:</label>
            <input 
              type="text" 
              placeholder="e.g. AAPL" 
              value={ticker} 
              onChange={(e) => setTicker(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Transaction Type:</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value)} 
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                borderRadius: '4px', 
                border: `2px solid ${themeColor}`,
                backgroundColor: 'white',
                fontWeight: 'bold',
                color: themeColor
              }}
            >
              <option value="BUY" style={{ color: '#22c55e', fontWeight: 'bold' }}>BUY</option>
              <option value="SELL" style={{ color: '#ef4444', fontWeight: 'bold' }}>SELL</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Quantity:</label>
            <input 
              type="number" 
              step="any" 
              placeholder="e.g. 10" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Price per Share ($):</label>
            <input 
              type="number" 
              step="any" 
              placeholder="e.g. 150.25" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Date of Transaction:</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <button type="submit" style={{ padding: '0.75rem', backgroundColor: themeColor, color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Save {type} Transaction
          </button>
        </form>

        {tradeMessage && (
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            borderRadius: '4px', 
            backgroundColor: isTradeError ? '#fee2e2' : bgColorLight,
            color: isTradeError ? '#991b1b' : (type === 'BUY' ? '#166534' : '#991b1b'),
            border: `1px solid ${isTradeError ? '#f87171' : themeColor}`
          }}>
            {tradeMessage}
          </div>
        )}

        <button 
          onClick={() => { setLoggedInUser(null); setTradeMessage(''); }} 
          style={{ marginTop: '2rem', padding: '0.5rem 1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
        >
          Log Out
        </button>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Monopoly Tracker</h1>
      <h2>{isLoginMode ? 'Log In to Your Portfolio' : 'Create an Account'}</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email Address:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {isLoginMode ? 'Sign In' : 'Register Account'}
        </button>
      </form>

      <button 
        onClick={() => { setIsLoginMode(!isLoginMode); setMessage(''); }} 
        style={{ background: 'none', border: 'none', color: '#0070f3', textDecoration: 'underline', marginTop: '1rem', cursor: 'pointer', width: '100%', textAlign: 'center' }}
      >
        {isLoginMode ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
      </button>

      {message && (
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          borderRadius: '4px', 
          backgroundColor: isError ? '#fee2e2' : '#dcfce7', 
          color: isError ? '#991b1b' : '#166534',
          border: `1px solid ${isError ? '#f87171' : '#4ade80'}`
        }}>
          {message}
        </div>
      )}
    </main>
  );
}
