// my-url-shortener-project/Frontend Test Submission/src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import URLShortenerPage from './URLShortenerPage';
import StatisticsPage from './StatisticsPage';
import { Log } from '../logging_middleware/logger.js';
import './App.css'; // Import the new CSS file

const App = () => {
  const [urls, setUrls] = useState(() => {
    try {
      const savedUrls = localStorage.getItem('shortenedUrls');
      return savedUrls ? JSON.parse(savedUrls) : [];
    } catch (error) {
      Log('frontend', 'error', 'app-init', `Failed to parse URLs from localStorage: ${error.message}`);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shortenedUrls', JSON.stringify(urls));
    } catch (error) {
      Log('frontend', 'error', 'app-persistence', `Failed to save URLs to localStorage: ${error.message}`);
    }
  }, [urls]);

  const RedirectHandler = () => {
    const { shortCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      Log('frontend', 'info', 'redirect', `Attempting redirect for: ${shortCode}`);
      const urlData = urls.find(u => u.shortCode === shortCode);

      if (urlData) {
        if (new Date(urlData.expiresAt) < new Date()) {
          Log('frontend', 'warn', 'redirect', `Expired link accessed: ${shortCode}`);
          alert("This link has expired.");
          navigate('/');
          return;
        }

        const updatedUrls = urls.map(u => {
          if (u.shortCode === shortCode) {
            const newClick = {
              timestamp: new Date().toISOString(),
              source: document.referrer || "Direct",
              location: "Coarse-grained location (simulated)",
            };
            return { ...u, clicks: u.clicks + 1, clickDetails: [...u.clickDetails, newClick] };
          }
          return u;
        });
        setUrls(updatedUrls);
        window.location.replace(urlData.longUrl);
      } else {
        Log('frontend', 'error', 'redirect', `Shortcode not found: ${shortCode}`);
        alert("URL not found!");
        navigate('/');
      }
    }, [shortCode, navigate]);

    return <div className="page-content"><h2>Redirecting...</h2></div>;
  };

  return (
    <Router>
      <nav className="navbar">
        <h1>URL Shortener</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/stats">Statistics</Link>
        </div>
      </nav>
      <main className="app-container">
        <Routes>
          <Route path="/" element={<URLShortenerPage urls={urls} setUrls={setUrls} />} />
          <Route path="/stats" element={<StatisticsPage urls={urls} />} />
          <Route path="/:shortCode" element={<RedirectHandler />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;