<template>
  <div class="products-list">
    <product-card
      v-for="(product, i) in lastAddedProducts"
      :key="i"
      :product="product"
      class="product"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Product } from "@/types/types";
import ProductCard from "@/components/ProductCard.vue";
const productsModule = namespace("product");

@Component({ components: { ProductCard } })
export default class ProductsList extends Vue {
  @productsModule.Getter("lastAddedProducts") lastAddedProducts!: Array<
    Product
  > | null;
  @productsModule.Action("fetchLastAddedProducts") fetchLastAddedProducts!: any;
  async created() {
    await this.fetchLastAddedProducts();
  }
}
</script>
<style lang="scss">
.products-list {
  display: flex;
  flex-wrap: wrap;
  .product {
    margin: 10px;
    width: calc(100% / 3 - 30px);
    @media (max-width: 900px) {
      width: calc(100% / 2 - 30px);
    }
    @media (max-width: 650px) {
      width: auto;
      max-width: 100%;
      margin-right: auto;
      margin-left: auto;
    }
  }
}
</style>
