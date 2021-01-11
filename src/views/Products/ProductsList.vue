<template>
  <div class="products-list">
    <h1>Produkty</h1>
    <vs-row align="center" v-if="isModerator">
      <vs-col type="flex" justify="flex-end">
        <vs-button flat success @click="$router.push({ name: 'AddProduct' })">
          <i class="bx bx-plus" />
          Dodaj produkt
        </vs-button>
      </vs-col>
    </vs-row>
    <product-card
      v-for="(product, i) in products"
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
import translateErrorMessage from "@/utils/errorTranslations";
const productsModule = namespace("product");
const authModule = namespace("auth");
const appModule = namespace("app");

@Component({ components: { ProductCard } })
export default class ProductsList extends Vue {
  @productsModule.Getter("products") products!: Array<Product> | null;
  @productsModule.Action("fetchProducts") fetchProducts!: any;
  @authModule.Action("isModerator") isModerator!: boolean;
  @appModule.Action("startLoading") startLoading: any;
  @appModule.Action("stopLoading") stopLoading: any;

  async created() {
    try {
      this.startLoading();
      await this.fetchProducts();
    } catch (e) {
        this.$vs.notification({
            duration: 10000,
            color: "danger",
            title: "Wystąpił błąd podczas ładowania produktu",
            text: translateErrorMessage(e)
        });
    } finally {
      this.stopLoading();
    }
  }
}
</script>
<style lang="scss">
.products-list {
  display: flex;
  flex-wrap: wrap;
  h1 {
    width: 100%;
  }
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
