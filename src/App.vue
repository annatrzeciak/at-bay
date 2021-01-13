<template>
  <div id="app">
    <loading />
    <nav-bar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import NavBar from "@/views/NavBar.vue";
import Loading from "@/views/Loading.vue";
import { namespace } from "vuex-class";
const authModule = namespace("auth");

@Component({ components: { NavBar, Loading } })
export default class App extends Vue {
  @authModule.Getter("isLogged") isLogged!: boolean;

  @Watch("isLogged")
  isLoggedChanged() {
    if (this.isLogged && this.$route.meta.requiresNoAuth) {
      this.$router.push({ name: "Home" });
    } else if (!this.isLogged && this.$route.meta.requiresAuth) {
      this.$router.push({ name: "Login" });
    }
  }
}
</script>
<style lang="scss">
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 60px;
  background: rgba(0, 0, 0, 0.05);
  h1,
  h2 {
    text-align: center;
  }
  .content {
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 15px;
    padding-left: 15px;
  }
}
</style>
