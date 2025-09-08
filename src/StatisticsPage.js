// my-url-shortener-project/Frontend Test Submission/src/StatisticsPage.js

import React, { useState, useEffect } from 'react';
import { Log } from '../logging_middleware/logger.js';

const Row = ({ urlData }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr>
        <td>
          <button className="toggle-button" onClick={() => setOpen(!open)}>
            {open ? '▼' : '▶'}
          </button>
        </td>
        <td>
          <a href={urlData.shortUrl} target="_blank" rel="noopener noreferrer">
            {urlData.shortUrl}
          </a>
        </td>
        <td>{new Date(urlData.createdAt).toLocaleString()}</td>
        <td>{new Date(urlData.expiresAt).toLocaleString()}</td>
        <td>{urlData.clicks}</td>
      </tr>
      {open && (
        <tr>
          <td colSpan="5">
            <div style={{ padding: '10px' }}>
              <h4>Details for {urlData.shortCode}</h4>
              <p><strong>Original URL:</strong> {urlData.longUrl}</p>
              {urlData.clickDetails.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {urlData.clickDetails.map((detail, index) => (
                      <tr key={index}>
                        <td>{new Date(detail.timestamp).toLocaleString()}</td>
                        <td>{detail.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : <p>No clicks recorded yet.</p>}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const StatisticsPage = ({ urls }) => {
  useEffect(() => { Log('frontend', 'info', 'stats-page', 'Statistics page viewed.'); }, []);

  return (
    <div className="page-content">
      <h2>URL Shortener Statistics</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Short URL</th>
            <th>Created</th>
            <th>Expires</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urls.length > 0 ? (
            urls.map(url => <Row key={url.shortCode} urlData={url} />)
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No URLs have been shortened yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsPage;