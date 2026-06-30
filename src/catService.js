import cats from './cats.js';
import { v4 } from 'uuid';

export function readCats() {
    return cats;
}

export function addCat(catData) {
    const newCat = {
        id: v4(),
        ... catData
    };

    cats.push(newCat);
}