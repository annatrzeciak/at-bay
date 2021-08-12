<template>
  <div class="site-cart">
    <span
      class="site-header__cart"
      @click="openedMiniProductsList = !openedMiniProductsList"
    >
      <svg-icon icon="bag" class="c-pointer" />
      <span
        v-if="countProductsInCart"
        id="CartCount"
        class="site-header__cart-count"
        data-cart-render="item_count"
        >{{ countProductsInCart }}</span
      >
    </span>
    <div
      id="header-cart"
      :class="['block block-cart', { 'd-block': openedMiniProductsList }]"
    >
      <ul class="mini-products-list">
        <li class="item d-flex" v-for="(item, i) in cart" :key="i">
          <div class="product-image">
            <img
              :src="item.product.image"
              :alt="item.product.name"
              :title="item.product.name"
            />
          </div>
          <div class="product-details">
            <span class="remove" @click="removeProductFromCart(item)">
              <i class="far fa-trash-alt"></i>
            </span>
            <div class="pName">{{ item.product.name }}</div>
            <div class="variant-cart">Black / XL</div>
            <div class="wrapQtyBtn">
              <div class="qtyField">
                <span class="label">Ilość:</span>
                <div
                  :class="['qtyBtn minus', { disabled: !item.count }]"
                  @click="subtractFromCart(item)"
                  role="button"
                >
                  <i class="fas fa-minus"></i>
                </div>
                <input
                  type="text"
                  id="Quantity"
                  name="quantity"
                  :value="item.count"
                  class="product-form__input qty"
                />
                <div
                  role="button"
                  class="qtyBtn plus"
                  @click="++item.count"
                >
                  <i class="fas fa-plus"></i>
                </div>
              </div>
            </div>
            <div class="priceRow">
              <div class="product-price">
                <span class="money"
                  >{{ getConvertedNumber(item.product.price) }} zł</span
                >
              </div>
            </div>
          </div>
        </li>
        <div class="mb-3 text-center" v-if="!cart.length">
          Twój koszyk jest pusty
        </div>
      </ul>
      <div class="total" v-if="cart.length">
        <div class="total-in">
          <span class="label">Razem:</span
          ><span class="product-price"
            ><span class="money"
              >{{ getConvertedNumber(totalCostInCart) }} zł</span
            ></span
          >
        </div>
        <div class="buttonSet text-center" v-if="cart.length">
          <router-link
            :to="{ name: 'FullCart' }"
            class="btn btn-secondary btn--small"
            >Pokaż koszyk</router-link
          >
          <button @click="submitCart" class="btn btn-secondary btn--small">
            zamów
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CartItem } from "@/types/types";
import { namespace } from "vuex-class";
import convertToTwoDecimalPlaces from "@/utils/convertNumberToTwoDecimalPlaces";
import SvgIcon from "@/components/SvgIcon.vue";

const orderModule = namespace("order");

@Component({ components: { SvgIcon } })
export default class Cart extends Vue {
  @orderModule.Getter("cart") cart!: Array<CartItem>;
  @orderModule.Getter("totalCostInCart") totalCostInCart!: number;
  @orderModule.Action("removeFromCart") removeFromCart!: any;
  @orderModule.Getter("countProductsInCart") countProductsInCart!: number;
  @orderModule.Action("sendCart") sendCart!: any;
  @orderModule.Action("updateProductInCart") updateProductInCart!: any;

  openedMiniProductsList = false;
  getConvertedNumber(number: number): string {
    return convertToTwoDecimalPlaces(number);
  }
  removeProductFromCart(cartItem: CartItem): void {
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
  changedCount(item: CartItem, event: any) {
    const changedItem = { ...item };
    if (event.target?.value) {
      changedItem.count = Number(event.target?.value);
      this.updateProductInCart(changedItem);
    }
  }
  subtractFromCart(item: CartItem) {
    if (item.count > 0) {
      --item.count;
    }
  }
  submitCart() {
    this.sendCart({ cart: this.cart, remarks: "" });
  }
}
</script>
<style lang="scss" scoped>
.item {
  img {
    height: 100%;
    width: 100%;
    object-position: center;
    object-fit: cover;
  }
  .product-details *:not(.pName) {
    user-select: none;
  }
}
</style>
