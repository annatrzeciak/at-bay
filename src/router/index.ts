import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Products from "@/views/Products.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Account from "@/views/Account.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/produkty",
    name: "Products",
    component: Products
  },
  {
    path: "/logowanie",
    name: "Login",
    component: Login
  },
  {
    path: "/rejestracja",
    name: "Register",
    component: Register
  },
  {
    path: "/konto",
    name: "Account",
    component: Account,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  if (requiresAuth && !store.getters["auth/isLogged"]) {
    next("/logowanie");
  } else {
    next();
  }
});
export default router;
