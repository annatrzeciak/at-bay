<template>
  <div class="products content">
    <h1>Produkty</h1>
    <add-product v-if="$route.name === 'AddProduct'" />
    <products-list v-else />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Product } from "@/types/types";
const productsModule = namespace("product");
import AddProduct from "@/views/Products/AddProduct.vue";
import ProductsList from "@/views/Products/ProductsList.vue";

@Component({ components: { AddProduct, ProductsList } })
export default class Products extends Vue {
  @productsModule.Getter("lastAddedProducts") lastAddedProducts!: Array<
    Product
  > | null;
  @productsModule.Action("fetchLastAddedProducts") fetchLastAddedProducts!: any;
  async created() {
    await this.fetchLastAddedProducts();
  }
}
</script>
