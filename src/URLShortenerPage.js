// my-url-shortener-project/Frontend Test Submission/src/URLShortenerPage.js

import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Log } from '../logging_middleware/logger.js';

const URLShortenerPage = ({ urls, setUrls }) => {
  const [input, setInput] = useState({ longUrl: '', validity: '', customShortcode: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const isValidUrl = (urlString) => { try { new URL(urlString); return true; } catch (e) { return false; } };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setResult(null);
    Log('frontend', 'info', 'shortener-form', 'Shorten URL process initiated.');

    const { longUrl, validity, customShortcode } = input;

    if (!isValidUrl(longUrl)) {
      const msg = `Invalid URL format: "${longUrl}"`;
      Log('frontend', 'error', 'validation', msg);
      setError(msg);
      return;
    }
    if (customShortcode && !/^[a-zA-Z0-9_-]+$/.test(customShortcode)) {
      const msg = 'Custom shortcode is invalid.';
      Log('frontend', 'error', 'validation', msg);
      setError(msg);
      return;
    }
    if (customShortcode && urls.some(u => u.shortCode === customShortcode)) {
      const msg = `Shortcode "${customShortcode}" is already in use.`;
      Log('frontend', 'error', 'validation', msg);
      setError(msg);
      return;
    }

    const shortCode = customShortcode || nanoid(7);
    const validityMinutes = parseInt(validity, 10) || 30;
    const creationDate = new Date();
    const expiryDate = new Date(creationDate.getTime() + validityMinutes * 60000);

    const newUrlData = {
      longUrl, shortCode, shortUrl: `${window.location.origin}/${shortCode}`,
      createdAt: creationDate.toISOString(), expiresAt: expiryDate.toISOString(),
      clicks: 0, clickDetails: [],
    };

    setUrls(prevUrls => [...prevUrls, newUrlData]);
    setResult({ shortUrl: newUrlData.shortUrl, expiresAt: newUrlData.expiresAt });
    Log('frontend', 'info', 'shortener-form', `URL successfully shortened to ${shortCode}.`);
    setInput({ longUrl: '', validity: '', customShortcode: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page-content">
      <h2>Create a Short URL</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="longUrl"
          placeholder="Original Long URL"
          value={input.longUrl}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="validity"
          placeholder="Optional: Validity Period (minutes, default 30)"
          value={input.validity}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="customShortcode"
          placeholder="Optional: Preferred Shortcode"
          value={input.customShortcode}
          onChange={handleInputChange}
        />
        <button type="submit">Shorten</button>
      </form>
      {result && (
        <div className="result-container">
          <h3>Result</h3>
          <div className="alert alert-success">
            Shortened URL: <a href={result.shortUrl} target="_blank" rel="noopener noreferrer">{result.shortUrl}</a>
            <br />
            Expires on: {new Date(result.expiresAt).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default URLShortenerPage;