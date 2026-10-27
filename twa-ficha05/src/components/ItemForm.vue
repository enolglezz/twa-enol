<script setup>
import { reactive, computed } from 'vue';

const props = defineProps({
  cats: Array
});

const emit = defineEmits(['save']);

const form = reactive({
  name: '',
  category: '',
  price: 0,
  tagsInput: ''
});

// Validaciones básicas reactivas
const errors = computed(() => {
  const errs = {};
  if (!form.name.trim()) errs.name = 'El nombre es obligatorio.';
  if (!form.category) errs.category = 'Selecciona una categoría.';
  if (form.price <= 0) errs.price = 'El precio debe ser mayor a 0.';
  return errs;
});

const isValid = computed(() => Object.keys(errors.value).length === 0);

function save() {
  if (!isValid.value) return;

  const newItem = {
    name: form.name.trim(),
    category: form.category,
    price: Number(form.price),
    tags: form.tagsInput.split(',').map(t => t.trim()).filter(Boolean)
  };

  emit('save', newItem);

  // Reset del formulario
  form.name = '';
  form.category = '';
  form.price = 0;
  form.tagsInput = '';
}
</script>

<template>
  <form @submit.prevent="save" class="item-form">
    <h3>Añadir Nuevo Ítem</h3>
    <div>
      <input type="text" v-model.trim="form.name" placeholder="Nombre..." />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </div>

    <div>
      <select v-model="form.category">
        <option value="">Selecciona categoría...</option>
        <option v-for="cat in props.cats" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <span v-if="errors.category" class="error">{{ errors.category }}</span>
    </div>

    <div>
      <input type="number" step="0.01" v-model.number="form.price" placeholder="Precio..." />
      <span v-if="errors.price" class="error">{{ errors.price }}</span>
    </div>

    <div>
      <input type="text" v-model.trim="form.tagsInput" placeholder="Tags separados por coma..." />
    </div>

    <button type="submit" :disabled="!isValid">Guardar Ítem</button>
  </form>
</template>

<style scoped>
.item-form {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.item-form input, .item-form select {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
.error {
  color: #dc2626;
  font-size: 0.85rem;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>