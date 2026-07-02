import { v4 } from 'uuid';
import breeds from "./breeds.js";

export function readBreeds() {
    return breeds;
};

export function addBreed(breedName) {
    const newBreed = {
        id: v4(),
        name: breedName
    };

    breeds.push(newBreed);
}

export function getBreedById(breedId) {
    return breeds.find(breed => breed.id === breedId);
}

export function getBreedByName(breedName) {
    return breeds.find(breed => breed.name === breedName);
}