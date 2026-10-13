import './style.css';
import { byCategory, search, categories } from './catalog.js';

// 2. Definición del Estado inicial
const state = {
  status: 'loading', 
  error: null, 
  items: [],
  query: '', 
  category: '', 
  sortDir: 'desc',
  selectedId: null,
};

// Referencias a elementos del DOM
const listEl = document.getElementById('list');
const detailEl = document.getElementById('detail');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category-select');
const sortBtn = document.getElementById('sort-btn');

// 1. load()async, fetch('/items.json'), manejo de res.ok y try/catch/finally
async function loadData() {
  state.status = 'loading';
  render();
  try {
    const res = await fetch('/items.json');
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    state.items = await res.json();
    state.status = 'ready';
  } catch (err) {
    state.status = 'error';
    state.error = err.message;
  } finally {
    render();
  }
}

// Función pura auxiliar para ordenar por precio según la dirección (dir: 'asc' | 'desc')
const sortByPrice = (list, dir) => {
  return [...list].toSorted((a, b) => {
    return dir === 'asc' ? a.price - b.price : b.price - a.price;
  });
};

// 2. Función render() principal — Sin usar innerHTML con los datos
function render() {
  // Limpiar contenedores de forma segura
  listEl.textContent = '';
  detailEl.textContent = '';

  // Manejo de estados de carga y error
  if (state.status === 'loading') {
    const li = document.createElement('li');
    li.textContent = 'Cargando catálogo...';
    listEl.appendChild(li);
    return;
  }

  if (state.status === 'error') {
    const li = document.createElement('li');
    li.textContent = `Error al cargar: ${state.error}`;
    listEl.appendChild(li);
    return;
  }

  // Actualizar opciones del selector de categorías de forma dinámica
  const availableCategories = categories(state.items);
  // Mantener la opción por defecto y añadir las demás
  const currentSelectVal = categorySelect.value;
  categorySelect.textContent = '';
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Todas las categorías';
  categorySelect.appendChild(defaultOption);

  availableCategories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });
  categorySelect.value = currentSelectVal;

  // Filtrado y ordenación de datos según el state actual
  let processedItems = [...state.items];

  // Filtro por categoría si está seleccionada
  if (state.category) {
    processedItems = byCategory(processedItems, state.category);
  }

  // Filtro por búsqueda de texto (nombre o tags)
  if (state.query) {
    processedItems = search(processedItems, state.query);
  }

  // Ordenación por precio
  processedItems = sortByPrice(processedItems, state.sortDir);
  sortBtn.textContent = `Ordenar por Precio: ${state.sortDir.toUpperCase()}`;

  // Renderizar la lista de elementos (#list)
  if (processedItems.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No se encontraron elementos.';
    listEl.appendChild(li);
  } else {
    processedItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.id} · ${item.name} ($${item.price})`;
      
      if (item.id === state.selectedId) {
        li.classList.add('selected');
      }

      // Evento click en cada elemento de la lista
      li.addEventListener('click', () => {
        state.selectedId = item.id;
        render();
      });

      listEl.appendChild(li);
    });
  }

  // Renderizar la sección de detalles (#detail)
  const selectedItem = state.items.find(i => i.id === state.selectedId);
  if (!selectedItem) {
    const p = document.createElement('p');
    p.textContent = 'Selecciona un elemento para ver los detalles.';
    detailEl.appendChild(p);
  } else {
    const h2 = document.createElement('h2');
    h2.textContent = selectedItem.name;
    detailEl.appendChild(h2);

    const pCat = document.createElement('p');
    pCat.textContent = `Categoría: ${selectedItem.category}`;
    detailEl.appendChild(pCat);

    const pPrice = document.createElement('p');
    pPrice.textContent = `Precio: $${selectedItem.price}`;
    detailEl.appendChild(pPrice);

    const pTags = document.createElement('p');
    pTags.textContent = `Tags: ${selectedItem.tags.join(', ')}`;
    detailEl.appendChild(pTags);

    // Renderizar el objeto anidado (ej. author u otros datos propios de tu entidad)
    if (selectedItem.author) {
      const h3 = document.createElement('h3');
      h3.textContent = 'Información adicional (Autor / Detalles):';
      detailEl.appendChild(h3);

      const ulNested = document.createElement('ul');
      Object.entries(selectedItem.author).forEach(([key, value]) => {
        const liNested = document.createElement('li');
        liNested.textContent = `${key}: ${value}`;
        ulNested.appendChild(liNested);
      });
      detailEl.appendChild(ulNested);
    }
  }
}

// 3. Configuración de Eventos. Solo modifican el state y llaman a render()

// Evento de búsqueda (input)
searchInput.addEventListener('input', (e) => {
  state.query = e.target.value;
  render();
});

// Evento de cambio de categoría (change)
categorySelect.addEventListener('change', (e) => {
  state.category = e.target.value;
  render();
});

// Evento de ordenación por botón (click)
sortBtn.addEventListener('click', () => {
  state.sortDir = state.sortDir === 'desc' ? 'asc' : 'desc';
  render();
});

// Inicializar la carga de datos al arrancar la aplicación
loadData();