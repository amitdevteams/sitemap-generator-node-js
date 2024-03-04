const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post('/crawl', async (req, res) => {
  const { url } = req.body;
  try {
    const { data } = await axios.get(url);
    const foundUrls = extractUrls(data);
    res.json(foundUrls);
  } catch (error) {
    console.error('Error while crawling:', error);
    res.status(500).json({ error: 'Failed to crawl URL' });
  }
});

const extractUrls = (html) => {
  // Use a proper HTML parsing library to extract URLs from the HTML content
  // This is a simplified example
  const regex = /href=["'](.*?)["']/g;
  const urls = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    urls.push(match[1]);
  }
  return urls;
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
