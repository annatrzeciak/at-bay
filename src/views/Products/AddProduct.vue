<template>
  <div class="products">
    <vs-button shadow @click="$router.push({ name: 'Products' })">
      &lt; wróć do produktów
    </vs-button>
    <h1>Dodaj nowy produkt</h1>
    <product-form @submit="saveNewProduct" ref="productForm" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProductForm from "@/components/ProductForm.vue";
import { Product } from "@/types/types";
import { namespace } from "vuex-class";
import translateErrorMessage from "@/utils/errorTranslations";
const productsModule = namespace("product");
const appModule = namespace("app");

@Component({ components: { ProductForm } })
export default class AddProduct extends Vue {
  @productsModule.Action("saveProduct") saveProduct!: any;
  @appModule.Action("startLoading") startLoading: any;
  @appModule.Action("stopLoading") stopLoading: any;

  async saveNewProduct(product: Product) {
    try {
      this.startLoading();
      await this.saveProduct(product);
      this.$refs["productForm"].reset();
      this.$vs.notification({
        duration: 10000,
        flat: true,
        color: "success",
        title: "Rejestracja nowego użytkownika zakończona pomyślnie",
        text: "Teraz możesz korzystać z pełnych możliwości serwisu"
      });
    } catch (e) {
      this.$vs.notification({
        duration: 10000,
        color: "danger",
        title: "Wystąpił błąd podczas zapisywania produktu",
        text: translateErrorMessage(e)
      });
    } finally {
      this.stopLoading();
    }
  }
}
</script>
<style lang="scss" scoped></style>
