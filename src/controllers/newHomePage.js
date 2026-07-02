import fs from 'fs/promises';
import { getCatById } from '../catService.js';
import { renderNotFoundPage } from '../utility/renderNotFoundPage.js';
import { renderBreedOptions } from '../utility/renderBreedOptions.js';
import { getBreedById, getBreedByName } from '../breedService.js';

export async function renderNewHomePage(catId) {
    const cat = getCatById(catId);

    if (!cat) {
        return renderNotFoundPage();
    }

    const breed = getBreedByName(cat.breed);


    const htmlContent = await fs.readFile('./src/views/catShelter.html', 'utf-8');

    const result = htmlContent.replaceAll('{{name}}', cat.name)
        .replace('{{description}}', cat.description)
        .replace('{{imageUrl}}', cat.imageUrl)
        .replace('{{breedId}}', breed.id)
        .replace('{{breedName}}', breed.name);

    return result;
}