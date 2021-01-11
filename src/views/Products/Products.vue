<template>
  <div class="products content">
    <add-product v-if="$route.name === 'AddProduct'" />
    <products-list v-else />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AddProduct from "@/views/Products/AddProduct.vue";
import ProductsList from "@/views/Products/ProductsList.vue";

@Component({ components: { AddProduct, ProductsList } })
export default class Products extends Vue {}
</script>
