import http from 'http';
import fs from 'fs/promises';
import cats from './cats.js'
import { renderHomePage } from './controllers/homeController.js';

const server = http.createServer(async (req, res) => {
    if (req.url === '/content/styles/site.css') {
        const cssContent = await fs.readFile('./src/content/styles/site.css', 'utf-8');

        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(cssContent);

        return res.end();
    }

    if (req.url === '/js/script.js') {
        const jsContent = await fs.readFile('.src/js/script.js', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(jsContent);
        return res.end();
    }

    

    let htmlContent = '';
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.url === '/') {
        htmlContent = await renderHomePage(req, res);
    } else if (req.url === '/cats/add-breed') {
        htmlContent = await fs.readFile('./src/views/addBreed.html', 'utf-8');
    } else if (req.url === '/cats/add-cat') {
        htmlContent = await fs.readFile('./src/views/addCat.html', 'utf-8');
    } else {
        htmlContent = await fs.readFile('./src/views/notFound.html', 'utf-8');
    }

    res.write(htmlContent);
    res.end();
});

server.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));