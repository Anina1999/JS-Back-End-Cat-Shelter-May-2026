import fs from 'fs/promises';

export async function renderEditCatPage(catId) {
    const htmlContent = await fs.readFile('./src/views/editCat.html', 'utf-8');

    return htmlContent;
}