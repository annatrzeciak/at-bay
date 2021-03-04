<template>
  <div class="cart">
    <vs-card dark>
      <template #title>
        <vs-row align="center" justify="space-between">
          <vs-col w="4">
            <h3>Koszyk</h3>
          </vs-col>
          <vs-col w="7">
            <div class="cart__total">
              razem:
              <strong>{{ getConvertedNumber(totalCostInCart) }}</strong> zł
            </div>
          </vs-col>
        </vs-row>
      </template>
      <template #text>
        <table class="cart__products">
          <tbody>
            <tr v-for="(item, i) in cart" :key="i">
              <td class="cart-item__count">{{ item.count }}</td>
              <td>x</td>
              <td class="cart-item__name">{{ item.product.name }}</td>
              <td class="cart-item__value">
                <span>{{
                  getConvertedNumber(item.count * item.product.price)
                }}</span>
                zł
              </td>
            </tr>
          </tbody>
        </table>

        <vs-button flat>
          pokaż koszyk
        </vs-button>
      </template>
    </vs-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Product } from "@/types/types";
import { namespace } from "vuex-class";
import convertToTwoDecimalPlaces from "@/utils/convertNumberToTwoDecimalPlaces";

const orderModule = namespace("order");

@Component({ components: {} })
export default class Cart extends Vue {
  @orderModule.Getter("cart") cart!: Array<{ count: number; product: Product }>;
  @orderModule.Getter("totalCostInCart") totalCostInCart!: number;

  getConvertedNumber(number: number) {
    return convertToTwoDecimalPlaces(number);
  }
}
</script>
<style lang="scss" scoped>
.cart {
  button {
    margin-top: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  &__total {
    font-size: 1.2rem;
    text-align: right;
  }
  &__products {
    width: 100%;
    .cart-item {
      td {
        flex: 1;
      }
      &__name {
        width: 65%;
        text-transform: uppercase;
        text-align: center;
      }
      &__value {
        width: 25%;
        font-weight: bold;
        text-align: right;
      }
    }
  }
}
</style>
