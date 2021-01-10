<template>
  <vs-navbar color="dark" fixed text-white square center-collapsed>
    <template #left>
      <span class="navbar--brand">
        atBay
      </span>
    </template>
    <vs-navbar-item :active="active === 'Home'">
      <router-link
        exact-active-class="active"
        tag="span"
        :to="{ name: 'Home' }"
      >
        Główna
      </router-link>
    </vs-navbar-item>
    <vs-navbar-item :active="$route.path.includes('produkty')">
      <router-link
        exact-active-class="active"
        tag="span"
        :to="{ name: 'Products' }"
      >
        Produkty
      </router-link>
    </vs-navbar-item>
    <template #right>
      <vs-button
        v-if="!isLogged"
        :border="$route.name === 'Login'"
        color="#fff"
        flat
        @click="redirectTo('Login')"
      >
        Logowanie
      </vs-button>
      <vs-button
        v-if="!isLogged"
        :border="$route.name === 'Register'"
        color="#fff"
        flat
        @click="redirectTo('Register')"
      >
        Rejestracja
      </vs-button>
      <vs-navbar-group v-if="isLogged">
        {{ userProfile.email }} <i class="bx bxs-down-arrow"></i>
        <template #items>
          <vs-navbar-item :active="active === 'Users'">
            <router-link
              v-if="
                userProfile.role === 'admin' || userProfile.role === 'moderator'
              "
              exact-active-class="active"
              tag="span"
              :to="{ name: 'Users' }"
            >
              Użytkownicy
            </router-link>
          </vs-navbar-item>
          <vs-navbar-item :active="active === 'Settings'">
            <router-link
              exact-active-class="active"
              tag="span"
              :to="{ name: 'Settings' }"
            >
              Ustawienia
            </router-link>
          </vs-navbar-item>

          <vs-navbar-item @click="logoutUser">
            Wyloguj
          </vs-navbar-item>
        </template>
      </vs-navbar-group>
    </template>
  </vs-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import translateErrorMessage from "@/utils/errorTranslations";
import { User } from "@/types/types";
const authModule = namespace("auth");
const appModule = namespace("app");

@Component
export default class NavBar extends Vue {
  @authModule.Getter("isLogged") isLogged!: boolean;
  @authModule.Getter("userProfile") userProfile!: User | null;
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
        title: "Wylogowywanie zakończone pomyślnie"
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
.vs-navbar__group i {
  vertical-align: middle;
}
</style>
