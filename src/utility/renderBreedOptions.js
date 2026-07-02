import { readBreeds } from "../breedService.js";

export function renderBreedOptions(selectedBreed) {
    const breeds = readBreeds();

    return breeds.map(breed => `<option value="${breed.id}" ${breed.name === selectedBreed ? ' selected' : ''}>${breed.name}</option>`).join('\n');
}