import http from 'http';
import fs from 'fs/promises';
import cats from './cats.js'
import { renderHomePage } from './controllers/homeController.js';
import breeds from './breeds.js';
import { addBreed, readBreeds } from './breedService.js';

const server = http.createServer(async (req, res) => {

    if (req.method === 'POST' && req.url === '/cats/add-breed') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        })

        req.on('end', async () => {
            const formData = new URLSearchParams(body);
            const breedName = formData.get('breed');
            addBreed(breedName);
        });

        return res.writeHead(302, { Location: '/' }).end();
    }

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