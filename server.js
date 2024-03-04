const express = require('express');
const puppeteer = require('puppeteer');
const {
    writeFileSync
} = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

async function crawlWebsite(baseUrl, maxDepth = 3) {
    const browser = await puppeteer.launch();
    const visited = new Set();
    const queue = [{
        url: baseUrl,
        depth: 0
    }];

    while (queue.length > 0) {
        const {
            url,
            depth
        } = queue.shift();
        if (visited.has(url) || depth > maxDepth || url.includes('$') || url.includes('#')) {
            continue;
        }
        console.log(`Crawling ${url}...`);
        try {
            const page = await browser.newPage();
            await page.goto(url, {
                waitUntil: 'networkidle2'
            });
            const links = await page.$$eval('a', anchors => anchors.map(a => a.href));
            await page.close();
            visited.add(url);

            links.forEach(link => {
                if (!visited.has(link) && link.startsWith(baseUrl) && !link.includes('$') && !link.includes('#')) {
                    queue.push({
                        url: link,
                        depth: depth + 1
                    });
                }
            });
        } catch (error) {
            console.error(`Error crawling ${url}:`, error);
        }
    }

    await browser.close();
    return Array.from(visited);
}

app.post('/crawl', async (req, res) => {
    const {
        baseUrl
    } = req.body;
    if (baseUrl) {
        try {
            const links = await crawlWebsite(baseUrl);
            const sitemapXml = generateSitemapXml(links);
            writeFileSync('sitemap.xml', sitemapXml);
            res.sendFile(path.join(__dirname, 'sitemap.xml'));
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error occurred while crawling.');
        }
    } else {
        res.status(400).send('URL is required.');
    }
});

function generateSitemapXml(links) {
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    links.forEach(url => {
        sitemap += `  <url>\n    <loc>${url}</loc>\n  </url>\n`;
    });
    sitemap += '</urlset>';
    return sitemap;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});