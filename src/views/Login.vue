<template>
  <div class="login content">
    <h1>Logowanie</h1>

    <form @submit.prevent="login" class="login__form center content-inputs">
      <vs-alert color="danger" v-if="errorMessage">
        <template #title>
          Wystąpił błąd
        </template>
        {{ errorMessage }}
      </vs-alert>
      <vs-input
        block
        v-model.trim="email"
        placeholder="Email"
        :state="$v.email.$error ? 'danger' : ''"
        @keypress="$v.email.$reset"
      >
        <template #icon>
          <i class="bx bx-mail-send"></i>
        </template>
        <template #message-danger v-if="$v.email.$error && !$v.email.required">
          Email jest wymagany
        </template>
        <template
          #message-danger
          v-else-if="$v.email.$error && !$v.email.email"
        >
          Zły format adresu email
        </template>
      </vs-input>

      <vs-input
        block
        type="password"
        v-model.trim="password"
        placeholder="Hasło"
        :state="$v.password.$error ? 'danger' : ''"
        @keypress="$v.password.$reset"
      >
        <template #icon>
          <i class="bx bx-lock-open-alt"></i>
        </template>
        <template
          #message-danger
          v-if="$v.password.$error && !$v.password.required"
        >
          Hasło jest wymagane
        </template>
      </vs-input>
      <vs-row align="center" class="form__footer">
        <vs-col type="flex" justify="space-between">
          <router-link to="/rejestracja"> Nie mam konta </router-link>
          <a @click="openedForgotPasswordModal = true"> Nie pamiętam hasła </a>
        </vs-col>
      </vs-row>
      <vs-row align="center">
        <vs-col type="flex" justify="flex-end">
          <vs-button flat primary animation-type="vertical">
            Wyślij
            <template #animate><i class="bx bx-log-in"></i></template>
          </vs-button> </vs-col
      ></vs-row>
    </form>
    <vs-dialog not-center v-model="openedForgotPasswordModal">
      <template #header>
        <h4 class="not-margin">
          Zresetuj hasło
        </h4>
      </template>

      <div class="con-content">
        <p>Otrzymasz email dzięki któremu będziesz mógł zresetować hasło</p>
        <vs-input
          @keydown.enter="sendResetPasswordEmail"
          v-model="emailToReset"
          placeholder="Email"
        ></vs-input>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="sendResetPasswordEmail" transparent>
            Resetuj
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

const authModule = namespace("auth");
const appModule = namespace("app");
import translateErrorMessage from "@/utils/errorTranslations";

@Component({
  components: {},
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  }
})
export default class Login extends Vue {
  @authModule.Action("login") loginUser!: any;
  @authModule.Action("resetPassword") resetPassword!: any;
  @appModule.Action("startLoading") startLoading: any;
  @appModule.Action("stopLoading") stopLoading: any;

  email = "";
  emailToReset = "";
  password = "";
  errorMessage = "";
  openedForgotPasswordModal = false;

  async login() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      try {
        this.startLoading();
        await this.loginUser({
          email: this.email,
          password: this.password
        });
        this.$vs.notification({
          duration: 10000,
          flat: true,
          color: "success",
          title: "Logowanie zakończone pomyślnie",
          text: "Możesz teraz korzystać z pełnych możliwości serwisu"
        });
      } catch (e) {
        this.errorMessage = translateErrorMessage(e);
        this.$vs.notification({
          duration: 10000,
          flat: true,
          color: "danger",
          title: "Wystąpił błąd podczas logowania",
          text: "Popraw dane lub spróbuj później"
        });
      } finally {
        this.stopLoading();
      }
    } else {
      this.$vs.notification({
        duration: 10000,
        flat: true,
        color: "danger",
        title: "Wprowadzono nieprawidłowe dane",
        text: "Popraw dane i spróbuj ponownie"
      });
    }
  }
  async sendResetPasswordEmail() {
    try {
      this.startLoading();
      await this.resetPassword(this.emailToReset);
      this.$vs.notification({
        duration: 10000,
        flat: true,
        color: "success",
        title: "Zlecenie restartu hasła zakończone pomyślnie",
        text: "Sprawdź pocztę, gdzie znajdziesz emaila z instrukcjami"
      });
    } catch (e) {
      this.$vs.notification({
        duration: 10000,
        flat: true,
        color: "danger",
        title: "Wystąpił błąd podczas restartu hasła",
        text: translateErrorMessage(e)
      });
    } finally {
      this.openedForgotPasswordModal = false;
      this.stopLoading();
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  &__form {
    max-width: 300px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;

    & > div {
      margin-bottom: 10px;
    }
    button {
      margin: 0;
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
}
</style>
<style lang="scss">
.vs-dialog {
  .con-content {
    width: 100%;
    p {
      font-size: 0.8rem;
      padding: 0px 10px;
    }
  }
  .vs-checkbox-label {
    font-size: 0.8rem;
  }
  .vs-input-parent {
    width: 100%;
  }
  .vs-input-content {
    margin: 10px 0px;
    width: 100%;
  }
  .vs-input {
    width: 100% !important;
  }
  .con-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .vs-button {
      margin: 0px;
      .vs-button__content {
        padding: 10px 30px;
      }
      ~ .vs-button {
        margin-left: 10px;
      }
    }
  }
}
</style>
