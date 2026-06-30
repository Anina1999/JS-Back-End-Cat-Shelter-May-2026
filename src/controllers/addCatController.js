import fs from 'fs/promises';
import { readBreeds } from '../breedService.js';

export async function renderAddCatPage() {
    const htmlContent = await fs.readFile('./src/views/addCat.html', 'utf-8');

    const breedOptions = readBreeds().map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('\n');
    const result = htmlContent.replace('{{breedOptions}}', breedOptions);

    return result;
}