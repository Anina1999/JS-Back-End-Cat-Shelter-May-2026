import fs from 'fs/promises';

export async function renderNotFoundPage(params) {
    return fs.readFile('./src/views/notFound.html', 'utf-8');
}