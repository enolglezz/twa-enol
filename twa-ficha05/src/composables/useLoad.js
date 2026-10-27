import { ref, onMounted } from 'vue';

export function useLoad(fetchFn) {
  const status = ref('loading');
  const error = ref(null);
  const items = ref([]);

  const load = async () => {
    status.value = 'loading';
    error.value = null;
    try {
      items.value = await fetchFn();
      status.value = 'ready';
    } catch (err) {
      status.value = 'error';
      error.value = err.message;
    }
  };

  onMounted(load);

  return { status, error, items, load };
}