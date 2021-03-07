<template>
  <div class="fill-cart content">
    <h1>Twój koszyk</h1>
    <vs-row justify="center" v-if="cart && cart.length">
      <vs-col lg="8" md="12">
        <vs-table striped class="cart__products">
          <template #tbody>
            <vs-tr v-for="item in cart" :key="item.product.uuid">
              <vs-td class="cart-item__count text-right">
                <vs-input
                  type="number"
                  :value="item.count"
                  @change="changedCount(item, $event)"
                />
              </vs-td>
              <vs-td>x</vs-td>
              <vs-td class="cart-item__name">
                {{ getConvertedNumber(item.product.price) }} zł

                <strong>{{ item.product.name }}</strong>
              </vs-td>
              <vs-td class="cart-item__value text-right">
                <span>{{
                  getConvertedNumber(item.count * item.product.price)
                }}</span>
                zł
              </vs-td>
              <vs-td
                class="cart-item__remove"
                @click="removeProductFromCart(item)"
              >
                <i class="bx bxs-trash" />
              </vs-td>
            </vs-tr>

            <vs-tr class="table__footer">
              <vs-td colspan="3" class="text-right">Razem:</vs-td>
              <vs-td class="text-right">
                {{ getConvertedNumber(totalCostInCart) }} zł
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vs-col>
    </vs-row>
    <div v-else class="text-center">Twój koszyk jest pusty</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Product } from "@/types/types";
import { namespace } from "vuex-class";
import convertToTwoDecimalPlaces from "@/utils/convertNumberToTwoDecimalPlaces";

const orderModule = namespace("order");

@Component({})
export default class FullCart extends Vue {
  @orderModule.Getter("cart") cart!: Array<{ count: number; product: Product }>;
  @orderModule.Getter("totalCostInCart") totalCostInCart!: number;
  @orderModule.Action("removeFromCart") removeFromCart!: any;
  @orderModule.Action("updateProductInCart") updateProductInCart!: any;

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
  changedCount(item: { count: number; product: Product }, event: any) {
    const changedItem = { ...item };
    if (event.target?.value) {
      changedItem.count = Number(event.target?.value);
      this.updateProductInCart(changedItem);
    }
  }
}
</script>
<style lang="scss" scoped>
.cart {
  &__products {
    width: 100%;
    .table {
      &__footer td {
        font-size: 1.2em;
        font-weight: bold;
      }
    }
  }
}
</style>
<style lang="scss">
.cart-item__count {
  .vs-input {
    max-width: 70px;
  }
}
</style>
