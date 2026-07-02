import fs from 'fs/promises';
import { readBreeds } from '../breedService.js';
import { renderBreedOptions } from '../utility/renderBreedOptions.js';

export async function renderAddCatPage() {
    const htmlContent = await fs.readFile('./src/views/addCat.html', 'utf-8');

    const result = htmlContent.replace('{{breedOptions}}', renderBreedOptions());

    return result;
}