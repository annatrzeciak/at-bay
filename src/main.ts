import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuesax from "vuesax";
import Vuelidate from "vuelidate";
import { auth } from "./firebase";

import "vuesax/dist/vuesax.css";
import "boxicons/css/boxicons.min.css";
Vue.use(Vuesax, { colors: { dark: "#2e354a" } });
Vue.use(Vuelidate);
Vue.directive("two-decimal-places", {
  bind: el => {
    const number = Number(el.innerText);
    el.innerText = String((Math.round(number * 100) / 100).toFixed(2));
  }
});

Vue.config.productionTip = false;
auth.onAuthStateChanged(user => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");

  if (user) store.dispatch("auth/fetchUserProfile", user);
});
