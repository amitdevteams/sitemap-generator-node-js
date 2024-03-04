import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [crawledUrls, setCrawledUrls] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/crawl', { url });
      setCrawledUrls(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error while crawling:', error);
      setError('Failed to crawl URL');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // Simulate downloading sitemap.xml
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // You can add code here to trigger file download
      console.log('Downloaded sitemap.xml');
    }, 2000);
  };

  return (
    <div className="App">
      <h1>URL Crawler</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter URL to crawl:
          <input type="text" value={url} onChange={handleUrlChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {loading && <div>Crawling...</div>}
      {error && <div>Error: {error}</div>}
      <h2>Crawled URLs:</h2>
      <ul>
        {crawledUrls.map((url, index) => (
          <li key={index}>{url}</li>
        ))}
      </ul>
      {crawledUrls.length > 0 && (
        <button onClick={handleDownload} disabled={downloading}>
          {downloading ? 'Downloading...' : 'Download Sitemap'}
        </button>
      )}
    </div>
  );
}

export default App;
