<script setup>
import { ref, computed } from 'vue';
import { byCategory, search, categories, sortByPrice } from './catalog.js';

// 1. State — un ref por cada campo del estado de la Ficha 03
const status = ref('loading');
const error = ref(null);
const items = ref([]);
const query = ref('');
const category = ref('');
const sortDir = ref('desc');
const selectedId = ref(null);

// 2. load() — el mismo fetch + res.ok + try/catch/finally
async function load() {
  status.value = 'loading';
  try {
    const res = await fetch('/items.json');
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('El archivo respondido no es un JSON válido');
    }
    
    items.value = await res.json();
    status.value = 'ready';
  } catch (err) {
    status.value = 'error';
    error.value = err.message;
  }
}

// Llamamos a load() al cargar el script
load();

// 3. Derived — tres propiedades computadas (computed)
const cats = computed(() => categories(items.value));

const visible = computed(() => {
  let result = [...items.value];
  if (category.value) {
    result = byCategory(result, category.value);
  }
  if (query.value) {
    result = search(result, query.value);
  }
  return sortByPrice(result, sortDir.value);
});

const selected = computed(() => {
  return items.value.find(item => item.id === selectedId.value);
});

// Función auxiliar para alternar la ordenación al hacer clic en el botón
const toggleSort = () => {
  sortDir.value = sortDir.value === 'desc' ? 'asc' : 'desc';
};
</script>

<template>
  <div id="app">
    <header>
      <h1>Catálogo en Vue</h1>
      <div class="controls">
        <!-- 4. Template: v-model en la caja de búsqueda -->
        <input type="text" v-model="query" placeholder="Buscar por nombre o tag..." />
        
        <!-- v-model en el select y v-for con las categorías (cats) -->
        <select v-model="category">
          <option value="">Todas las categorías</option>
          <option v-for="cat in cats" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>

        <!-- @click en el botón de ordenación -->
        <button @click="toggleSort">
          Ordenar por Precio: {{ sortDir.toUpperCase() }}
        </button>
      </div>
    </header>

    <main class="content-layout">
      <!-- Los tres estados manejados con v-if / v-else-if / v-else -->
      <div v-if="status === 'loading'">Cargando catálogo...</div>
      <div v-else-if="status === 'error'" class="error-box">
        <p>Error al cargar: {{ error }}</p>
        <!-- Botón Retry obligatorio/recomendado -->
        <button @click="load">Reintentar</button>
      </div>
      
      <!-- v-for + :key en la lista -->
      <ul v-else id="list">
        <li 
          v-for="item in visible" 
          :key="item.id"
          :class="{ selected: item.id === selectedId }"
          @click="selectedId = item.id"
        >
          {{ item.name }} · {{ item.price.toFixed(2) }} €
        </li>
      </ul>

      <!-- Sección de detalles con v-if="selected" -->
      <section id="detail" v-if="selected">
        <h2>{{ selected.name }}</h2>
        <p><strong>Categoría:</strong> {{ selected.category }}</p>
        <p><strong>Precio:</strong> {{ selected.price.toFixed(2) }} €</p>
        <p><strong>Tags:</strong> {{ selected.tags.join(', ') }}</p>

        <!-- Objeto anidado (ej. author u otros datos) -->
        <div v-if="selected.author">
          <h3>Información adicional:</h3>
          <ul>
            <li v-for="(val, key) in selected.author" :key="key">
              <strong>{{ key }}:</strong> {{ val }}
            </li>
          </ul>
        </div>
      </section>

      <section id="detail" v-else>
        <p>Selecciona un elemento para ver los detalles.</p>
      </section>
    </main>
  </div>
</template>

<!-- 5. Estilos encapsulados con scoped -->
<style scoped>
.selected {
  background-color: #e2e8f0;
  font-weight: bold;
}

#app {
  max-width: 900px;
  margin: 0 auto;
  font-family: sans-serif;
  padding: 20px;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.content-layout {
  display: flex;
  gap: 20px;
}

ul#list {
  list-style: none;
  padding: 0;
  width: 50%;
}

ul#list li {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 4px;
}

ul#list li:hover {
  background-color: #f8fafc;
}

#detail {
  width: 50%;
  padding: 15px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  background-color: #fdfdfd;
}
</style>