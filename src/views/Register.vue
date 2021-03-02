<template>
  <div class="register content">
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

      <vs-input
        block
        v-model.trim="name"
        placeholder="Imię (i nazwisko)"
        :state="$v.name.$error ? 'danger' : ''"
        @keypress="$v.name.$reset"
      >
        <template #icon>
          <i class="bx bx-user"></i>
        </template>
        <template #message-danger v-if="$v.name.$error && !$v.name.required">
          Imię (i nazwisko) jest wymagane
        </template>
        <template
          #message-danger
          v-else-if="$v.name.$error && !$v.name.minLength"
        >
          Minimalna długość to 3 znaki
        </template>
      </vs-input>

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
        <template #message-danger v-if="$v.email.$error && !$v.email.required">
          Email jest wymagany
        </template>
        <template
          #message-danger
          v-if="$v.password.$error && !$v.password.required"
        >
          Hasło jest wymagane
        </template>
        <template
          #message-danger
          v-else-if="$v.password.$error && !$v.password.minLength"
        >
          Minimalna długość to 6 znaków
        </template>
      </vs-input>
      <vs-input
        block
        type="password"
        v-model.trim="repeatPassword"
        placeholder="Powtórz hasło"
        :state="$v.repeatPassword.$error ? 'danger' : ''"
        @keypress="$v.repeatPassword.$reset"
      >
        <template #icon>
          <i class="bx bx-lock-open-alt"></i>
        </template>
        <template
          #message-danger
          v-if="$v.repeatPassword.$error && !$v.repeatPassword.required"
        >
          Hasło jest wymagane
        </template>
        <template
          #message-danger
          v-else-if="
            $v.repeatPassword.$error && !$v.repeatPassword.sameAsPassword
          "
        >
          Hasła nie są identyczne
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
import { validationMixin } from "vuelidate";
import { email, required, minLength, sameAs } from "vuelidate/lib/validators";

@Component({
  components: {},
  mixins: [validationMixin],
  validations: {
    name: { required, minLength: minLength(3) },
    email: {
      required,
      email
    },
    password: {
      minLength: minLength(6),
      required
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs("password")
    }
  }
})
export default class Register extends Vue {
  @authModule.Action("signup") registerNewUser: any;
  @appModule.Action("startLoading") startLoading: any;
  @appModule.Action("stopLoading") stopLoading: any;

  name = "";
  email = "";
  password = "";
  repeatPassword = "";
  errorMessage = "";

  async register() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      try {
        this.startLoading();
        await this.registerNewUser({
          name: this.name,
          email: this.email,
          password: this.password
        });
        this.$vs.notification({
          duration: 5000,
          flat: true,
          color: "success",
          title: "Rejestracja nowego użytkownika zakończona pomyślnie",
          text: "Teraz możesz korzystać z pełnych możliwości serwisu"
        });
      } catch (e) {
        this.errorMessage = translateErrorMessage(e);
        this.$vs.notification({
          duration: 5000,
          color: "danger",
          title: "Wystąpił błąd podczas rejestracji",
          text: "Popraw dane lub spróbuj później"
        });
      } finally {
        this.stopLoading();
      }
    } else {
      this.$vs.notification({
        duration: 5000,
        flat: true,
        color: "danger",
        title: "Wprowadzono nieprawidłowe dane",
        text: "Popraw dane i spróbuj ponownie"
      });
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
