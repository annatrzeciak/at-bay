<template>
  <div class="register">
    <h1>Rejestracja</h1>
    <form
      class="register__form center content-inputs"
      @submit.prevent="register"
    >
      <vs-alert color="danger" v-if="errorMessage">
        <template #title>
          Wystąpił błąd
        </template>
        {{ errorMessage }}
      </vs-alert>

      <vs-input block v-model.trim="name" placeholder="Imię (i nazwisko)">
        <template #icon>
          <i class="bx bx-user"></i>
        </template>
      </vs-input>

      <vs-input block v-model.trim="email" placeholder="Email">
        <template #icon>
          <i class="bx bx-mail-send"></i>
        </template>
      </vs-input>

      <vs-input
        block
        type="password"
        v-model.trim="password"
        placeholder="Hasło"
      >
        <template #icon>
          <i class="bx bx-lock-open-alt"></i>
        </template>
      </vs-input>
      <vs-input
        block
        type="password"
        v-model.trim="password2"
        placeholder="Powtórz hasło"
      >
        <template #icon>
          <i class="bx bx-lock-open-alt"></i>
        </template>
      </vs-input>

      <vs-row align="center" class="form__footer">
        <vs-col type="flex" justify="space-between">
          <router-link to="/logowanie"> Mam już konto </router-link>
          <vs-button flat primary animation-type="vertical">
            Wyślij
            <template #animate> <i class="bx bx-mail-send"></i> </template>
          </vs-button>
        </vs-col>
      </vs-row>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const authModule = namespace("auth");
const appModule = namespace("app");
import translateErrorMessage from "@/utils/errorTranslations";
@Component({
  components: {}
})
export default class Register extends Vue {
  @authModule.Action("signup") registerNewUser: any;
  @appModule.Action("startLoading") startLoading: any;
  @appModule.Action("stopLoading") stopLoading: any;

  name = "";
  email = "";
  password = "";
  password2 = "";
  errorMessage = "";
  async register() {
    try {
      this.startLoading();
      await this.registerNewUser({
        name: this.name,
        email: this.email,
        password: this.password
      });
      this.$vs.notification({
        duration: 10000,
        flat: true,
        color: "success",
        title: "Rejestracja nowego użytkownika zakończona pomyślnie",
        text: "Zaloguj się i korzystaj z pełnych możliwości serwisu"
      });
    } catch (e) {
      this.errorMessage = translateErrorMessage(e);
      this.$vs.notification({
        duration: 10000,
        color: "danger",
        title: "Wystąpił błąd podczas rejestracji",
        text: "sPopraw dane lub spróbuj później"
      });
    } finally {
      this.stopLoading();
    }
  }
}
</script>
<style lang="scss" scoped>
.register {
  .content-inputs {
    max-width: 300px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;

    & > div {
      margin-bottom: 10px;
    }
  }

  .form__footer {
    a {
      cursor: pointer;
      color: gray;
      text-decoration: none;
      font-size: 0.9rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
