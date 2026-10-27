<script setup>
import { ref, computed, watch } from 'vue';
import { byCategory, search, categories, sortByPrice } from './catalog.js';
import { useLoad } from './composables/useLoad.js';
import { getJSON } from './api/getJSON.js';

import ItemList from './components/ItemList.vue';
import ItemDetail from './components/ItemDetail.vue';
import ItemForm from './components/ItemForm.vue';

// 4. useLoad composable
const { status, error, items, load } = useLoad(() => getJSON('/items.json'));

const query = ref('');
const category = ref('');
const sortDir = ref('desc');
const selectedId = ref(null);

// 5. watch para limpiar la selección al buscar o cambiar filtros
watch(query, () => {
  selectedId.value = null;
});

// 3. Computed derivados y cálculo del próximo ID para nuevos elementos
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

const nextId = computed(() => 
  Math.max(0, ...items.value.map(i => i.id)) + 1
);

function addItem(itemData) {
  items.value.push({ id: nextId.value, ...itemData });
}

const toggleSort = () => {
  sortDir.value = sortDir.value === 'desc' ? 'asc' : 'desc';
};
</script>

<template>
  <div id="app">
    <header>
      <h1>Catálogo en Vue - Ficha 05</h1>
      <div class="controls">
        <input type="text" v-model="query" placeholder="Buscar por nombre o tag..." />
        
        <select v-model="category">
          <option value="">Todas las categorías</option>
          <option v-for="cat in cats" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>

        <button @click="toggleSort">
          Ordenar por Precio: {{ sortDir.toUpperCase() }}
        </button>
      </div>
    </header>

    <main class="content-layout">
      <!-- Estados de carga y error -->
      <div v-if="status === 'loading'">Cargando catálogo...</div>
      <div v-else-if="status === 'error'" class="error-box">
        <p>Error al cargar: {{ error }}</p>
        <button @click="load">Reintentar</button>
      </div>

      <div v-else class="main-content-wrapper">
        <!-- 3. Formulario para añadir elementos -->
        <ItemForm :cats="cats" @save="addItem" />

        <div class="split-view">
          <!-- 1 & 2. ItemList con Props y Emits -->
          <ItemList 
            :items="visible" 
            :selectedId="selectedId" 
            @select="selectedId = $event" 
          />

          <!-- ItemDetail con Props -->
          <ItemDetail :item="selected" />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
#app {
  max-width: 950px;
  margin: 0 auto;
  font-family: sans-serif;
  padding: 20px;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.main-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.split-view {
  display: flex;
  gap: 20px;
}

.error-box {
  padding: 15px;
  background: #fee2e2;
  color: #b91c1c;
  border-radius: 4px;
}
</style>