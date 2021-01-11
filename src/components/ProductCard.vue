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
      <vs-button success icon> <i class="bx bxs-cart-add"></i> </vs-button>
      <vs-button class="btn-chat" shadow primary>
        {{ product.price }} zł
      </vs-button>
    </template>
  </vs-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Product } from "@/types/types";

@Component({ components: {} })
export default class ProductCard extends Vue {
  @Prop() product!: Product;
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
