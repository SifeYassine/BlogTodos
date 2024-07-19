<template>
  <div
    class="register-container max-w-md mx-auto p-5 bg-gray-100 rounded-lg shadow-md"
  >
    <h2 class="text-2xl mb-5 ml-[38%]">Register</h2>
    <form @submit.prevent="register">
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="name">Name</label>
        <input
          v-model="name"
          type="text"
          id="name"
          class="w-full px-3 py-2 border rounded-lg bg-white"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="username">Username</label>
        <input
          v-model="username"
          type="text"
          id="username"
          class="w-full px-3 py-2 border rounded-lg bg-white"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="email">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="w-full px-3 py-2 border rounded-lg bg-white"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="password">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="w-full px-3 py-2 border rounded-lg bg-white"
          required
        />
      </div>
      <button
        type="submit"
        class="w-1/2 bg-blue-500 text-white ml-[23%] py-2 rounded-full shadow-md"
      >
        Register
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { setupAxios } from "../router/axios";
import { useRouter } from "vue-router";

export default {
  name: "Register",
  setup() {
    const name = ref("");
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const axios = setupAxios();
    const router = useRouter();

    async function register() {
      try {
        const response = await axios.post("/users", {
          name: name.value,
          username: username.value,
          email: email.value,
          password: password.value,
        });

        alert("Registration successful!");
        router.push("/login");
      } catch (error) {
        console.error(error);
      }
    }

    return {
      name,
      username,
      email,
      password,
      register,
    };
  },
};
</script>
