<template>
  <vs-card type="2">
    <template #title>
      <h3>{{ product.name }}</h3>
    </template>
    <template #img>
      <img :src="product.image" :alt="product.name + 'image'" />
    </template>
    <template #text>
      <p>
        {{ product.description }}
      </p>
    </template>
    <template #interactions>
      <vs-button success icon @click="addProductToCart">
        <i class="bx bxs-cart-add" />
      </vs-button>
      <vs-button class="btn-chat" shadow primary>
        {{ product.price }} zł
      </vs-button>
    </template>
  </vs-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Product } from "@/types/types";
import { namespace } from "vuex-class";

const orderModule = namespace("order");

@Component({ components: {} })
export default class ProductCard extends Vue {
  @orderModule.Action("addToCart") addToCart!: (cartItem: {
    count: number;
    product: Product;
  }) => Promise<void>;

  @Prop() product!: Product;

  addProductToCart() {
    try {
      this.addToCart({ count: 1, product: this.product });
      this.$vs.notification({
        duration: 5000,
        flat: true,
        color: "success",
        title: "Dodano produkt do koszyka"
      });
    } catch (e) {
      this.$vs.notification({
        duration: 5000,
        color: "danger",
        title: "Wystąpił błąd podczas dodawania produktu do koszyka",
        text: "Szczegóły: " + e
      });
    }
  }
}
</script>
<style lang="scss">
.vs-card {
  height: 100%;
  &__img {
    height: 100%;
    img {
      height: 100%;
      min-height: 200px;
      object-fit: cover;
    }
  }
}
</style>
