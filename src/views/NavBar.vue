<template>
  <vs-navbar color="primary" fixed text-white square center-collapsed>
    <template #left>
      <span class="navbar--brand">
        atBay
      </span>
    </template>
    <vs-navbar-item :active="active === 'Home'">
      <router-link exact-active-class="active" tag="span" to="/"
        >Główna</router-link
      >
    </vs-navbar-item>
    <vs-navbar-item :active="active === 'Products'">
      <router-link exact-active-class="active" tag="span" to="/produkty"
        >Produkty</router-link
      ></vs-navbar-item
    >
    <template #right>
      <vs-button
        :border="$route.name === 'Login'"
        color="#fff"
        flat
        @click="redirectTo('Login')"
        >Logowanie</vs-button
      >
      <vs-button
        :border="$route.name === 'Register'"
        color="#fff"
        flat
        @click="redirectTo('Register')"
        >Rejestracja</vs-button
      >
    </template>
  </vs-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class NavBar extends Vue {
  redirectTo(name: string) {
    if (this.$route.name !== name) this.$router.push({ name: name });
  }
  get active() {
    return this.$route.name;
  }
}
</script>

<style scoped>
.navbar--brand {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
