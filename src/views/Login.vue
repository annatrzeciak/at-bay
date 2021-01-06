<template>
  <div class="login">
    <h1>Logowanie</h1>

    <form @submit.prevent="login" class="center content-inputs">
      <vs-alert color="danger" v-if="errorMessage">
        <template #title>
          Wystąpił błąd
        </template>
        {{ errorMessage }}
      </vs-alert>
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
      <vs-row align="center" class="form-footer">
        <vs-col type="flex" justify="space-between">
          <vs-button dark transparent @click="$router.push({ name: 'Register' })">
            Nie mam konta
          </vs-button>
          <vs-button flat primary animation-type="vertical">
            Wyślij
            <template #animate><i class="bx bx-log-in"></i></template>
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
export default class Login extends Vue {
  @authModule.Action("login") loginUser!: any;
  @appModule.Action("startLoading") startLoading: any;
  @appModule.Action("stopLoading") stopLoading: any;

  email = "";
  password = "";
  errorMessage = "";

  async login() {
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
        color: "danger",
        title: "Wystąpił błąd podczas logowania",
        text: "Popraw dane lub spróbuj później"
      });
    } finally {
      this.stopLoading();
    }
  }
}
</script>
<style lang="scss" scoped>
form {
  max-width: 300px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  & > div {
    margin-bottom: 10px;
  }
}
</style>
