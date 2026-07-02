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