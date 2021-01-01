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
      <vs-button color="#fff" flat>Login</vs-button>
      <vs-button color="#fff" border>Register</vs-button>
    </template>
  </vs-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class NavBar extends Vue {}
</script>

<style scoped>
.navbar--brand {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
