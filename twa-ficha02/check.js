import assert from 'node:assert/strict';
import { 
  byCategory, 
  search, 
  total, 
  top, 
  categories, 
  withDiscount 
} from './catalog.js';

// Datos de prueba aislados
const testItems = [
  { id: 1, name: 'Book A', category: 'book', price: 10, tags: ['dev'] },
  { id: 2, name: 'Game B', category: 'game', price: 20, tags: ['fun'] },
  { id: 3, name: 'Book C', category: 'book', price: 30, tags: ['dev', 'classic'] }
];

// 1. Prueba de byCategory
assert.deepEqual(byCategory(testItems, 'book'), [
  { id: 1, name: 'Book A', category: 'book', price: 10, tags: ['dev'] },
  { id: 3, name: 'Book C', category: 'book', price: 30, tags: ['dev', 'classic'] }
]);

// 2. Prueba de search
assert.deepEqual(search(testItems, 'classic'), [
  { id: 3, name: 'Book C', category: 'book', price: 30, tags: ['dev', 'classic'] }
]);

// 3. Prueba de total
assert.equal(total(testItems), 60);

// 4. Prueba de top
assert.deepEqual(top(testItems, 2), [
  { id: 3, name: 'Book C', category: 'book', price: 30, tags: ['dev', 'classic'] },
  { id: 2, name: 'Game B', category: 'game', price: 20, tags: ['fun'] }
]);

// 5. Prueba de categories
assert.deepEqual(categories(testItems), ['book', 'game']);

// 6. Prueba de withDiscount
assert.deepEqual(withDiscount(testItems, 10), [
  { id: 1, name: 'Book A', category: 'book', price: 9, tags: ['dev'] },
  { id: 2, name: 'Game B', category: 'game', price: 18, tags: ['fun'] },
  { id: 3, name: 'Book C', category: 'book', price: 27, tags: ['dev', 'classic'] }
]);