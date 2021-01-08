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

Vue.config.productionTip = false;
auth.onAuthStateChanged(user => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");

  if (user) store.dispatch("auth/fetchUserProfile", user);
});
