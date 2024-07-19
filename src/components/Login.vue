<template>
  <div
    class="login-container max-w-md mx-auto p-5 bg-gray-100 rounded-lg shadow-md"
  >
    <h2 class="text-2xl mb-5 ml-[40%]">Login</h2>
    <form @submit.prevent="login">
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
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { setupAxios } from "../router/axios";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  setup() {
    const username = ref("");
    const password = ref("");
    const axios = setupAxios();
    const router = useRouter();

    async function login() {
      try {
        const response = await axios.get("/users", {
          params: {
            username: username.value,
            password: password.value,
          },
        });

        const user = response.data.find(
          (user) =>
            user.username === username.value && user.password === password.value
        );

        if (user) {
          localStorage.setItem(
            "user",
            JSON.stringify({ id: user.id, username: user.username })
          );
          alert("Login successful!");
          router.push("/");
        } else {
          alert("Invalid credentials!");
        }
      } catch (error) {
        console.error(error);
      }
    }

    return {
      username,
      password,
      login,
    };
  },
};
</script>
