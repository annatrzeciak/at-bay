import Vue from "vue";
import Vuex, { Commit } from "vuex";
import app from "./modules/app";
import product from "./modules/product";
import auth from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    product,
    auth
  }
});
