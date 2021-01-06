<template>
  <div id="app">
    <loading />
    <nav-bar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/views/NavBar.vue";
import Loading from "@/views/Loading.vue";

@Component({ components: { NavBar, Loading } })
export default class App extends Vue {}
</script>
<style lang="scss">
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}
</style>
