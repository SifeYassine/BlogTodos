<template>
  <div id="app">
    <header
      class="rounded-lg bg-gray-100 shadow-md w-fit h-12 px-6 py-3 m-5 mx-auto font-bold"
    >
      <nav class="flex justify-center gap-12">
        <router-link to="/">Home</router-link>
        <router-link to="/posts">Posts</router-link>
        <router-link to="/users">Users</router-link>
        <router-link to="/todos" v-if="loggedIn">Todos</router-link>
        <router-link
          to="/register"
          v-if="!loggedIn"
          class="bg-purple-500 py-1 px-2 rounded-full -mt-1 shadow-md"
        >
          Register
        </router-link>
        <router-link
          to="/login"
          v-if="!loggedIn"
          class="bg-blue-500 py-1 px-2 rounded-full -mt-1 shadow-md"
        >
          Login
        </router-link>
        <button
          @click="logout"
          v-if="loggedIn"
          class="bg-red-500 py-1 px-2 rounded-full -mt-1 shadow-md"
        >
          Logout
        </button>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import "../src/style.css";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "App",
  setup() {
    const router = useRouter();
    const loggedIn = ref(localStorage.getItem("user") !== null);

    function logout() {
      localStorage.removeItem("user");
      loggedIn.value = false;
      router.push("/login");
    }

    return {
      loggedIn,
      logout,
    };
  },
};
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  color: #333;
}
</style>
