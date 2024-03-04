document.getElementById('crawlForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const baseUrl = document.getElementById('baseUrl').value.trim();
    if (baseUrl) {
        fetch('http://sitemaps/crawl', { // Update URL to match your server URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ baseUrl })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob(); // Parse response as Blob
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'sitemap.xml';
            document.body.appendChild(a); // Append <a> element to the DOM
            a.click(); // Programmatically trigger the click event on <a>
            a.remove(); // Remove the <a> element from the DOM after download
            window.URL.revokeObjectURL(url); // Release the object URL
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error occurred while crawling!');
        });
    } else {
        alert('Please enter a URL.');
    }
});
