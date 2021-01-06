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
        v-if="!isLogged"
        :border="$route.name === 'Login'"
        color="#fff"
        flat
        @click="redirectTo('Login')"
        >Logowanie</vs-button
      >
      <vs-button
        v-if="!isLogged"
        :border="$route.name === 'Register'"
        color="#fff"
        flat
        @click="redirectTo('Register')"
        >Rejestracja</vs-button
      >
      <vs-button v-if="isLogged" color="#fff" flat @click="logoutUser"
        >Wyloguj</vs-button
      >
    </template>
  </vs-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import translateErrorMessage from "@/utils/errorTranslations";
const authModule = namespace("auth");
const appModule = namespace("app");

@Component
export default class NavBar extends Vue {
  @authModule.Getter("isLogged") isLogged!: boolean;
  @authModule.Action("logout") logout: any;
  @appModule.Action("startLoading") startLoading: any;
  @appModule.Action("stopLoading") stopLoading: any;
  redirectTo(name: string) {
    if (this.$route.name !== name) this.$router.push({ name: name });
  }
  get active() {
    return this.$route.name;
  }
  async logoutUser() {
    this.startLoading();
    try {
      await this.logout();
      this.$vs.notification({
        duration: 10000,
        flat: true,
        color: "success",
        title: "Wylogowywanie zakończone pomyślnie",
        text: "Możesz teraz korzystać z pełnych możliwości serwisu"
      });
    } catch (e) {
      this.$vs.notification({
        duration: 10000,
        color: "danger",
        title: "Wystąpił błąd podczas wylogowania",
        text: translateErrorMessage(e)
      });
    } finally {
      this.stopLoading();
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar--brand {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
