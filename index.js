const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

fs.readFile(path.join(__dirname,'config.json'), (err, data) => {

    const config = JSON.parse(data);

    const server = http.createServer((req, res) => {
        let filePath = path.join(__dirname, 'public', req.url === '/' ? 'home.html' : `${req.url}.html`);
        let contentType = 'text/html';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // Page not found, redirect to home
                    fs.readFile(path.join(__dirname, 'public', 'home.html'), (err, content) => {
                        if (err) {
                            res.writeHead(500);
                            res.end('Error reading home.html');
                            return;
                        }
                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(content, 'utf-8');
                    });
                } else {
                    // Some server error
                    res.writeHead(500);
                    res.end(`Server Error: ${err.code}`);
                }
            } else {
                // Success
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    });

    const PORT = config.PORT || 3000;
    server.listen(PORT, '0.0.0.0',() => console.log(`Server running on port ${PORT},\nlink to website : http://${os.networkInterfaces()['Wi-Fi'][3].address}/TorTulStorage/home`));
});
