import fs from 'fs/promises';
import { readCats } from '../catService.js';

export async function renderHomePage() {
    const htmlContent = await fs.readFile('./src/views/home/index.html', 'utf-8');

    const catTemplate = (cat) => `
        <li>
            <img src="${cat.imageUrl}" alt="${cat.name}">
            <h3>${cat.name}</h3>
            <p><span>Breed: </span>${cat.breed}</p>
            <p><span>Description: </span>${cat.description}</p>
            <ul class="buttons">
                <li class="btn edit"><a href="">Change Info</a></li>
                <li class="btn delete"><a href="">New Home</a></li>
            </ul>
        </li>
    `;

    const cats = readCats();
    const catsContent = `<ul>${cats.map(cat => catTemplate(cat)).join('\n')}</ul>`

    const result = htmlContent.replace('{{cats}}', catsContent);
    return result;
}
