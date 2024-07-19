<template>
  <div>
    <ul class="users list-none p-0 m-0 grid grid-cols-1 gap-2.5 w-52">
      <li
        v-for="user in users"
        :key="user.id"
        class="p-2.5 cursor-pointer w-full rounded-lg bg-gray-100 shadow-md"
      >
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { setupAxios } from "../router/axios";

export default {
  name: "UserList",
  setup() {
    const users = ref([]);
    const axios = setupAxios();

    async function fetchUsers() {
      try {
        const response = await axios.get("/users");
        users.value = response.data;
        console.log(users.value);
      } catch (error) {
        console.error(error);
      }
    }

    onMounted(() => {
      fetchUsers();
    });

    return {
      users,
    };
  },
};
</script>
