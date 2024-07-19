<template>
  <div>
    <ul class="todos list-none p-0 m-0 grid grid-cols-1 gap-2.5 w-52">
      <li
        v-for="todo in paginatedTodos"
        :key="todo.id"
        class="p-2.5 cursor-pointer w-full rounded-lg bg-gray-100 shadow-md"
      >
        {{ todo.title }}
      </li>
    </ul>

    <!-- Pagination Controls -->
    <div class="pagination mt-5 text-center">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="mx-1 my-0 px-2 py-1 cursor-pointer border border-gray-300 rounded-full bg-gray-100 shadow-md"
      >
        Previous
      </button>
      <span>Page {{ currentPage }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="mx-1 my-0 px-2 py-1 cursor-pointer border border-gray-300 rounded-full bg-gray-100 shadow-md"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style>
.pagination button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

<script>
import { ref, onMounted, computed } from "vue";
import { setupAxios } from "../router/axios";

export default {
  name: "TodoList",
  setup() {
    const todos = ref([]);
    const axios = setupAxios();
    const currentPage = ref(1);
    const pageSize = 5;

    // Retrieve logged-in user ID from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.id : null;

    async function fetchTodos() {
      try {
        const response = await axios.get("/todos", {
          params: {
            userId: userId, // Filter todos by userId
          },
        });

        todos.value = response.data.slice(0, 20);
      } catch (error) {
        console.error(error);
      }
    }

    const totalPages = computed(() => {
      return Math.ceil(todos.value.length / pageSize);
    });

    const paginatedTodos = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize;
      return todos.value.slice(startIndex, startIndex + pageSize);
    });

    function previousPage() {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    }

    function nextPage() {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    }

    onMounted(() => {
      fetchTodos();
    });

    return {
      paginatedTodos,
      currentPage,
      totalPages,
      previousPage,
      nextPage,
    };
  },
};
</script>
