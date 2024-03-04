// Crawler.js
import React, { useState } from 'react';
import axios from 'axios';

const Crawler = () => {
  const [url, setUrl] = useState('');
  const [sitemap, setSitemap] = useState('');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/crawl', { baseUrl: url });
      setSitemap(response.data);
    } catch (error) {
      console.error('Error crawling:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([sitemap], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">Enter the base URL:</label><br />
        <input type="text" id="url" value={url} onChange={handleUrlChange} /><br />
        <button type="submit">Crawl Website</button>
      </form>
      {sitemap && (
        <div>
          <h3>Sitemap Generated Successfully!</h3>
          <button onClick={handleDownload}>Download Sitemap</button>
        </div>
      )}
    </div>
  );
};

export default Crawler;
