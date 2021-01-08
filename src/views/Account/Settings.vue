<template>
  <div class="account content">
    <h1>Ustawienia</h1>
    <vs-row justify="center">
      <vs-col lg="6" md="8" sm="12">
        <vs-table striped>
          <template #tbody>
            <vs-tr>
              <vs-td> <strong>Imię (i nazwisko)</strong> </vs-td>
              <vs-td>
                {{ userProfile.name }}
              </vs-td>
            </vs-tr>
            <vs-tr>
              <vs-td> <strong>Email</strong> </vs-td>
              <vs-td>
                {{ userProfile.email }}
              </vs-td>
            </vs-tr>
            <vs-tr>
              <vs-td> <strong>Konto</strong> </vs-td>
              <vs-td>
                {{ userProfile.role }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vs-col>
    </vs-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { User } from "@/types/types";
const authModule = namespace("auth");

@Component({
  components: {}
})
export default class Settings extends Vue {
  @authModule.Getter("userProfile") userProfile!: User | null;
}
</script>
<style lang="scss">
.account .vs-table table {
  min-width: 250px;
}
</style>
