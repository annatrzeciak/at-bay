import { Commit } from "vuex";
import { Product } from "@/types/types";

export enum OrderActions {
  ADD_TO_CART = "addToCart",
  REMOVE_FROM_CART = "removeFromCart",
  SEND_CART = "sendCart"
}

export enum OrderMutations {
  ADD_TO_CART = "addToCart",
  REMOVE_FROM_CART = "removeFromCart",
  CLEAR_CART = "clearCart"
}

export interface OrderState {
  cart: Array<{ count: number; product: Product }>;
}
export const createInitialState = (): OrderState => ({
  cart: []
});

const getters = {
  cart: (state: OrderState) => state.cart,
  countProductsInCart: (state: OrderState) => {
    let total = 0;
    state.cart.forEach(item => (total += item.count));
    return total;
  }
};
const mutations = {
  [OrderMutations.ADD_TO_CART](
    state: OrderState,
    cartItem: { count: number; product: Product }
  ) {
    const productInCart = state.cart.find(
      item => item.product.uuid === cartItem.product.uuid
    );
    if (productInCart) {
      productInCart.count++;
    } else {
      state.cart.push(cartItem);
    }
  },
  [OrderMutations.REMOVE_FROM_CART](
    state: OrderState,
    cartItem: { count: number; product: Product }
  ) {
    const index = state.cart
      .map(item => item.product.uuid)
      .indexOf(cartItem.product.uuid);

    if (index > -1) {
      state.cart.splice(index, 1);
    }
  },
  [OrderMutations.CLEAR_CART](state: OrderState) {
    state.cart = [];
  }
};
const actions = {
  [OrderActions.ADD_TO_CART]: async (
    { commit }: { commit: Commit },
    cartItem: { count: number; product: Product }
  ) => {
    commit(OrderMutations.ADD_TO_CART, cartItem);
  },
  [OrderActions.REMOVE_FROM_CART]: async (
    { commit }: { commit: Commit },
    cartItem: { count: number; product: Product }
  ) => {
    commit(OrderMutations.REMOVE_FROM_CART, cartItem);
  },
  [OrderActions.SEND_CART]: async ({ commit }: { commit: Commit }) => {
    commit(OrderMutations.CLEAR_CART);
  }
};

const state = createInitialState();

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
