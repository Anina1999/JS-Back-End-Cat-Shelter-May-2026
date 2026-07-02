import { getBreedById } from './breedService.js';
import cats from './cats.js';
import { v4 } from 'uuid';

export function readCats() {
    return cats;
}

export function addCat(catData) {
    const breedName = getBreedById(catData.breed)?.name || 'Unknown breed';
    const newCat = {
        id: v4(),
        ... catData,
        breed: breedName,
    };

    cats.push(newCat);
}

export function getCatById(catId) {
    return cats.find(cat => cat.id === catId);
}

export function editCat(catId, catData) {
    const catIndex = cats.findIndex(cat => cat.id === catId);


    const breedName = getBreedById(catData.breed)?.name || 'Unknown breed';

    cats[catIndex] = {
        id: catId,
        ...catData,
        breed: breedName
    }
}

export function deleteCat(catId) {
    const catIndex = cats.findIndex(cat => cat.id === catId);

    if (catIndex === -1) {
        return new Error('Cat not found');
    }

    cats.splice(catIndex, 1);
}