import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Products from "@/views/Products/Products.vue";
import AddProduct from "@/views/Products/AddProduct.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Settings from "@/views/Account/Settings.vue";
import Users from "@/views/Account/Users.vue";
import FullCart from "@/views/FullCart.vue";
import store from "@/store";
import Product from "@/views/Products/Product.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/produkty/:uuid",
    name: "Product",
    component: Product
  },
  {
    path: "/produkty",
    name: "Products",
    component: Products,
    children: [
      {
        path: "dodaj",
        name: "AddProduct",
        component: AddProduct,
        meta: {
          requiresAuth: true,
          requiresModerator: true
        }
      }
    ]
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
  },
  {
    path: "/koszyk",
    name: "FullCart",
    component: FullCart,
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
  store.dispatch("app/startLoading");
  setTimeout(() => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
    const requiresNoAuth = to.matched.some(x => x.meta.requiresNoAuth);
    const requiresModerator = to.matched.some(x => x.meta.requiresModerator);
    const isLogged = store.getters["auth/isLogged"];
    const isModerator = store.getters["auth/isModerator"];

    if (requiresAuth && !isLogged) {
      next({ name: "Login" });
    } else if (requiresNoAuth && isLogged) {
      next({ name: "Home" });
    } else if (requiresModerator && !isModerator) {
      next({ name: "Home" });
    } else {
      next();
    }
  }, 100);
});
router.afterEach(() => {
  setTimeout(() => {
    store.dispatch("app/stopLoading");
  }, 300);
});
export default router;
