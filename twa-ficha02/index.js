import { items } from './data.js';
import { byCategory, search, total, top, categories, withDiscount } from './catalog.js';

console.log('Por categoría:', byCategory(items, 'book'));
console.log('Búsqueda:', search(items, 'dev'));
console.log('Total:', total(items));
console.log('Top 2 más caros:', top(items, 2));
console.log('Categorías únicas:', categories(items));
console.log('Con 10% descuento:', withDiscount(items, 10));