import http from 'http';
import fs from 'fs/promises';

const server = http.createServer(async (req, res) => {
    const homePage = await fs.readFile('./src/views/home/index.html', 'utf-8');

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(homePage);

    res.end();
});

server.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));