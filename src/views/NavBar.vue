<template>
  <div>
    <div class="top-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-10 col-sm-8 col-md-5 col-lg-4">
            <p class="phone-no">
              <i class="anm anm-phone-s"></i> +48 123 456 789
            </p>
          </div>
          <div
            class="col-sm-4 col-md-4 col-lg-4 d-none d-lg-none d-md-flex d-lg-flex justify-content-center align-items-center"
          >
            <div class="text-center">
              <p class="top-header_middle-text">Ekspresowa wysyłka</p>
            </div>
          </div>
          <div
            class="col-2 col-sm-4 col-md-3 col-lg-4 d-flex justify-content-end align-items-center"
          >
            <span
              class="user-menu d-block d-lg-none"
              @click="openedAccountMenu = !openedAccountMenu"
            >
              <svg-icon icon="user" />
            </span>
            <ul
              :class="[
                'customer-links list-inline',
                { 'd-block': openedAccountMenu }
              ]"
            >
              <template v-if="!isLogged">
                <li>
                  <router-link :to="{ name: 'Login' }">
                    Logowanie
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'Register' }">
                    Rejestracja
                  </router-link>
                </li>
              </template>
              <template v-else>
                <li>
                  <router-link :to="{ name: 'Settings' }">
                    Konto
                  </router-link>
                </li>

                <li>
                  <span class="c-pointer" @click="logoutUser">Wyloguj</span>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="navbar" class="header-wrap classicHeader animated d-flex">
      <div class="container-fluid">
        <div class="row align-items-center">
          <!--Desktop Logo-->
          <div class="logo col-md-2 col-lg-2 d-none d-lg-block">
            <router-link :to="{ name: 'Home' }">
              <img
                src="../assets/images/logo.svg"
                alt="Belle Multipurpose Html Template"
                title="Belle Multipurpose Html Template"
              />
            </router-link>
          </div>
          <!--End Desktop Logo-->
          <div class="col-2 col-sm-3 col-md-3 col-lg-8">
            <div class="d-block d-lg-none">
              <button
                :class="[
                  'btn--link site-header__menu js-mobile-nav-toggle',
                  'mobile-nav--' + (!openedMobileMenu ? 'open' : 'close')
                ]"
                @click="openedMobileMenu = !openedMobileMenu"
              >
                <i class="fas fa-bars" />
              </button>
            </div>
            <!--Desktop Menu-->
            <nav class="grid__item" id="AccessibleNav">
              <!-- for mobile -->
              <ul id="siteNav" class="site-nav medium center hidearrow">
                <li class="lvl1">
                  <router-link :to="{ name: 'Home' }">
                    Główna
                  </router-link>
                </li>
                <li class="lvl1">
                  <router-link :to="{ name: 'Products' }">
                    Produkty
                  </router-link>
                </li>
              </ul>
            </nav>
            <!--End Desktop Menu-->
          </div>
          <!--Mobile Logo-->
          <div
            class="col-6 col-sm-6 col-md-6 col-lg-2 d-block d-lg-none mobile-logo"
          >
            <div class="logo">
              <router-link :to="{ name: 'Home' }">
                <img
                  src="../assets/images/logo.svg"
                  alt="Belle Multipurpose Html Template"
                  title="Belle Multipurpose Html Template"
                />
              </router-link>
            </div>
          </div>
          <!--Mobile Logo-->
          <div class="col-4 col-sm-3 col-md-3 col-lg-2">
            <cart />
          </div>
        </div>
      </div>
    </div>
    <div
      :class="['mobile-nav-wrapper', { active: openedMobileMenu }]"
      role="navigation"
    >
      <div
        class="closemobileMenu d-flex justify-content-between align-items-center"
        @click="openedMobileMenu = false"
      >
        <span>Zamknij Menu</span><i class="fas fa-times"></i>
      </div>
      <ul id="MobileNav" class="mobile-nav">
        <li class="lvl1">
          <router-link :to="{ name: 'Home' }">Główna</router-link>
        </li>
        <li class="lvl1">
          <router-link :to="{ name: 'Products' }">Produkty</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import translateErrorMessage from "@/utils/errorTranslations";
import { User } from "@/types/types";
import Cart from "@/components/Cart.vue";
import SvgIcon from "@/components/SvgIcon.vue";
const authModule = namespace("auth");
const appModule = namespace("app");
const orderModule = namespace("order");

@Component({ components: { SvgIcon, Cart } })
export default class NavBar extends Vue {
  @authModule.Getter("isLogged") isLogged!: boolean;
  @authModule.Getter("userProfile") userProfile!: User | null;
  @authModule.Getter("isModerator") isModerator!: boolean;
  @authModule.Getter("isUser") isUser!: boolean;
  @authModule.Action("logout") logout: any;
  @appModule.Action("startLoading") startLoading: any;
  @appModule.Action("stopLoading") stopLoading: any;
  @orderModule.Getter("countProductsInCart") countProductsInCart!: number;

  openedMobileMenu = false;
  openedAccountMenu = false;
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
        duration: 5000,
        flat: true,
        color: "success",
        title: "Wylogowywanie zakończone pomyślnie"
      });
    } catch (e) {
      this.$vs.notification({
        duration: 5000,
        color: "danger",
        title: "Wystąpił błąd podczas wylogowania",
        text: translateErrorMessage(e)
      });
    } finally {
      this.stopLoading();
    }
  }
  @Watch("$route")
  changedRoute() {
    this.openedMobileMenu = false;
  }
}
</script>

<style lang="scss" scoped>
#navbar {
  position: static;
}
</style>
