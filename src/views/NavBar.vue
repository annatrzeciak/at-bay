<template>
  <vs-navbar color="primary" fixed text-white square center-collapsed>
    <template #left>
      <span class="navbar--brand">
        atBay
      </span>
    </template>
    <router-link exact-active-class="active" tag="vs-navbar-item" to="/"
      >Główna</router-link
    >
    <router-link exact-active-class="active" tag="vs-navbar-item" to="/produkty"
      >Produkty</router-link
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
}
</script>

<style scoped>
.navbar--brand {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
