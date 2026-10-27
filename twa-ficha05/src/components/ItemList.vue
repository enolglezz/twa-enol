<script setup>
defineProps({
  items: Array,
  selectedId: [Number, null]
});

defineEmits(['select']);
</script>

<template>
  <ul id="list">
    <li 
      v-for="item in items" 
      :key="item.id"
      :class="{ selected: item.id === selectedId }"
      @click="$emit('select', item.id)"
    >
      {{ item.name }} · {{ item.price.toFixed(2) }} €
    </li>
  </ul>
</template>

<style scoped>
.selected {
  background-color: #e2e8f0;
  font-weight: bold;
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
</style>