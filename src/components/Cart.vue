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
        <table class="cart__products" v-if="cart.length">
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
              <td
                class="cart-item__remove"
                @click="removeProductFromCart(item)"
              >
                <i class="bx bxs-trash" />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="cart__products--empty" v-else>
          Twój koszyk jest pusty
        </div>

        <vs-button
          v-if="$route.name !== 'FullCart'"
          flat
          @click="$router.push({ name: 'FullCart' })"
        >
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
  @orderModule.Action("removeFromCart") removeFromCart!: any;

  getConvertedNumber(number: number): string {
    return convertToTwoDecimalPlaces(number);
  }
  removeProductFromCart(cartItem: { count: number; product: Product }): void {
    try {
      this.removeFromCart(cartItem);
    } catch (e) {
      this.$vs.notification({
        duration: 5000,
        color: "danger",
        title: "Wystąpił błąd podczas usuwania produktu z koszyka",
        text: "Szczegóły: " + e
      });
    }
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
    &--empty {
      text-align: center;
    }
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
      &__remove {
        position: relative;
        top: 2px;
        i:hover {
          color: rgb(255, 71, 87);
        }
      }
    }
  }
}
</style>
