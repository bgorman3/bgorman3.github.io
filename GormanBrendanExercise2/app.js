const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = './views/';
    let statusCode = 200;
    let contentType = 'text/html';

    // Routing
    if (req.url === '/contact') {
        filePath += 'contact.html';
    } else if (req.url === '/about') {
        filePath += 'about.html';
    } else {
        filePath += '404.html';
        statusCode = 404;
    }

    // Read the HTML file and send response
    fs.readFile(filePath, (err, content) => {
        if (err) {
            console.log(err);
            res.writeHead(500);
            res.end('Server Error');
        } else {
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 8080;
const HOSTNAME = 'localhost';

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
