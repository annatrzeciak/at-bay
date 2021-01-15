import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import product from "./modules/product";
import auth from "./modules/auth";
import order from "@/store/modules/order";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    product,
    auth,
    order
  }
});
