import { writeFile } from 'node:fs/promises';
import { items } from './data.js';
import { 
  byCategory, 
  search, 
  total, 
  top, 
  categories, 
  withDiscount 
} from './catalog.js';

// process.argv.slice(2) extrae los argumentos introducidos por consola
const [cmd, arg] = process.argv.slice(2);

// Función auxiliar para imprimir listas con el formato "1 · Clean Code"
const printList = (list) => {
  list.forEach(item => console.log(`${item.id} · ${item.name}`));
};

// Lógica de comandos según los argumentos pasados
if (!cmd) {
  // node app.js -> lista todos los elementos
  printList(items);
} else if (cmd === 'search') {
  // node app.js search clean
  printList(search(items, arg || ''));
} else if (cmd === 'top') {
  // node app.js top 3
  const limit = Number(arg) || 3;
  printList(top(items, limit));
} else if (cmd === 'report') {
  // node app.js report -> guarda report.json
  const reportData = {
    count: items.length,
    total: total(items),
    categories: categories(items),
    top3: top(items, 3)
  };

  // Escribe el archivo report.json de forma asíncrona
  await writeFile('report.json', JSON.stringify(reportData, null, 2));
  console.log('report.json generado con éxito.');
} else {
  // node app.js book -> filtra por la categoría ingresada
  printList(byCategory(items, cmd));
}