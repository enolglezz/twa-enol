<script setup>
defineProps({
  item: Object
});
</script>

<template>
  <section id="detail" v-if="item">
    <h2>{{ item.name }}</h2>
    <p><strong>Categoría:</strong> {{ item.category }}</p>
    <p><strong>Precio:</strong> {{ item.price.toFixed(2) }} €</p>
    <p><strong>Tags:</strong> {{ item.tags.join(', ') }}</p>

    <div v-if="item.author">
      <h3>Información adicional:</h3>
      <ul>
        <li v-for="(val, key) in item.author" :key="key">
          <strong>{{ key }}:</strong> {{ val }}
        </li>
      </ul>
    </div>
  </section>
  <section id="detail" v-else>
    <p>Selecciona un elemento para ver los detalles.</p>
  </section>
</template>

<style scoped>
#detail {
  width: 50%;
  padding: 15px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  background-color: #fdfdfd;
}
</style>