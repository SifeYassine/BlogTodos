import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import PostList from "../components/PostList.vue";
import UserList from "../components/UserList.vue";
import TodoList from "../components/TodoList.vue";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/posts", component: PostList },
  { path: "/users", component: UserList },
  { path: "/todos", component: TodoList },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
