import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Products from "@/views/Products/Products.vue";
import AddProduct from "@/views/Products/AddProduct.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Settings from "@/views/Account/Settings.vue";
import Users from "@/views/Account/Users.vue";
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
    component: Products,
    children: [{ path: "dodaj", name: "AddProduct", component: AddProduct }]
  },
  {
    path: "/logowanie",
    name: "Login",
    component: Login,
    meta: {
      requiresNoAuth: true
    }
  },
  {
    path: "/rejestracja",
    name: "Register",
    component: Register,
    meta: {
      requiresNoAuth: true
    }
  },
  {
    path: "/uzytkownicy",
    name: "Users",
    component: Users,
    meta: {
      requiresAuth: true,
      requiresModerator: true
    }
  },
  {
    path: "/ustawienia",
    name: "Settings",
    component: Settings,
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
  const requiresNoAuth = to.matched.some(x => x.meta.requiresNoAuth);
  const requiresModerator = to.matched.some(x => x.meta.requiresModerator);
  const role = store.getters["auth/userProfile"]
    ? store.getters["auth/userProfile"].role
    : null;

  if (requiresAuth && !store.getters["auth/isLogged"]) {
    next("/logowanie");
  } else if (requiresNoAuth && store.getters["auth/isLogged"]) {
    next("/");
  } else if (requiresModerator && !(role === "moderator" || role === "admin")) {
    next("/");
  } else {
    next();
  }
});
export default router;
