import { ref, Ref } from "vue";

export function useUsers() {
  const items: Ref = ref([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  async function fetchData() {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      items.value = await response.json();
    } catch (err) {
      error.value =
        err instanceof Error ? err : new Error("An unknown error occurred");
    } finally {
      loading.value = false;
    }

    return { items, loading, error };
  }

  return {
    items,
    loading,
    error,
    fetchData,
  };
}
