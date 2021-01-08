<template>
  <div class="account content">
    <h1>Użytkownicy</h1>
    <vs-table striped>
      <template #thead>
        <vs-tr>
          <vs-th>
            Name
          </vs-th>
          <vs-th>
            Email
          </vs-th>
          <vs-th>
            Role
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr :key="user.email" v-for="user in usersList">
          <vs-td>
            {{ user.name }}
          </vs-td>
          <vs-td>
            {{ user.email }}
          </vs-td>
          <vs-td>
            {{ user.role }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
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
export default class Account extends Vue {
  @authModule.Action("fetchUsersList") fetchUsersList!: any;
  @authModule.Getter("usersList") usersList!: Array<User | null>;

  created() {
    this.fetchUsersList();
  }
}
</script>
<style lang="scss">
.account .vs-table table {
  min-width: 250px;
}
</style>
