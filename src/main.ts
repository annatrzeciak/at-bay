import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuesax from "vuesax";
import { auth } from "./firebase";

import "vuesax/dist/vuesax.css";
import "boxicons/css/boxicons.min.css";
Vue.use(Vuesax);

Vue.config.productionTip = false;
auth.onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});
