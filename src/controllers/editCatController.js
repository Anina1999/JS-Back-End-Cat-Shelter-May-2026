import fs from 'fs/promises';
import { getCatById } from '../catService.js';
import { renderNotFoundPage } from '../utility/renderNotFoundPage.js';
import { readBreeds } from '../breedService.js';
import { renderBreedOptions } from '../utility/renderBreedOptions.js';

export async function renderEditCatPage(catId) {
    const cat = getCatById(catId)

    if (!cat) {
        return renderNotFoundPage();
    }

    const htmlContent = await fs.readFile('./src/views/editCat.html', 'utf-8');
    const result = htmlContent.replace('{{name}}', cat.name)
        .replace('{{description}}', cat.description)
        .replace('{{imageUrl}}', cat.imageUrl)
        .replace('{{breedOptions}}', renderBreedOptions(cat.breed));

    return result;
}

