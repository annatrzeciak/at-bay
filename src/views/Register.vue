<template>
  <div class="register">
    <h1>Rejestracja</h1>
    <form class="center content-inputs" @submit.prevent="register">
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
      <vs-row :w="12" align="center">
        <vs-col :w="12" type="flex" justify="flex-end">
          <vs-button flat primary animation-type="vertical">
            Zapisz
            <template #animate> <i class="bx bx-log-in"></i> </template>
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
    } catch (e) {
      this.errorMessage = translateErrorMessage(e);
    } finally {
      this.stopLoading();
    }
  }
}
</script>
<style lang="scss">
.content-inputs {
  max-width: 300px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  & > div {
    margin-bottom: 10px;
  }
}
</style>
