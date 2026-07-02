import http from 'http';
import fs from 'fs/promises';
import cats from './cats.js'
import { renderHomePage } from './controllers/homeController.js';
import breeds from './breeds.js';
import { addBreed, readBreeds } from './breedService.js';
import { addCat, readCats } from './catService.js';
import { renderAddCatPage } from './controllers/addCatController.js';
import { resolve } from 'dns';
import { readBodyFormData } from './utility/readBodyFormData.js';
import { renderEditCatPage } from './controllers/editCatController.js';
import { renderNotFoundPage } from './utility/renderNotFoundPage.js';

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/cats/add-breed') {
        const bodyFormData = await readBodyFormData(req);

        addBreed(bodyFormData.get('breed'));

        return res.writeHead(302, { Location: '/' }).end();
    }

    if (req.method === 'POST' && req.url === '/cats/add-cat') {
        const bodyFormData = await readBodyFormData(req);

        const newCat = {
            name: bodyFormData.get('name'),
            description: bodyFormData.get('description'),
            imageUrl: bodyFormData.get('imageUrl'),
            breed: bodyFormData.get('breed')
        };

        addCat(newCat);

        return res.writeHead(302, { Location: '/'}).end();
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
        htmlContent = await renderHomePage();
    } else if (req.url === '/cats/add-breed') {
        htmlContent = await fs.readFile('./src/views/addBreed.html', 'utf-8');
    } else if (req.url === '/cats/add-cat') {
        htmlContent = await renderAddCatPage();
    } else if (req.url.startsWith('/cats/edit-cat/')) {
        const catId = req.url.split('/').pop();
        htmlContent = await renderEditCatPage(catId);
    } else {
        htmlContent = await renderNotFoundPage();
    }

    res.write(htmlContent);
    res.end();
});

server.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));