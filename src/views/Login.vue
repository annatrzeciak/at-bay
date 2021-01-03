<template>
  <div class="login">
    <h1>Logowanie</h1>

    <form class="center content-inputs">
      <vs-input block v-model="email" placeholder="Email">
        <template #icon>
          <i class="bx bx-user"></i>
        </template>
      </vs-input>

      <vs-input
        block
        type="password"
        v-model="password"
        placeholder="Hasło"
      >
        <template #icon>
          <i class="bx bx-lock-open-alt"></i>
        </template>
      </vs-input>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Login extends Vue {
  email = "";
  password = "";
}
</script>
<style lang="scss">
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
