import { ActionContext } from "vuex";
import { GetterFunc, ModuleNames, RootState } from "@/store/modules/types";
import { Product } from "@/types/types";
import * as fb from "@/firebase";
import { ActionFunc } from "@/store/modules/types";

export enum OrderActions {
  ADD_TO_CART = "addToCart",
  REMOVE_FROM_CART = "removeFromCart",
  REMOVE_ALL_FROM_CART = "removeAllFromCart",
  SEND_CART = "sendCart",
  UPDATE_PRODUCT_IN_CART = "updateProductInCart"
}

export enum OrderMutations {
  ADD_TO_CART = "addToCart",
  REMOVE_FROM_CART = "removeFromCart",
  CLEAR_CART = "clearCart",
  UPDATE_PRODUCT_IN_CART = "updateProductInCart"
}

export interface OrderState {
  cart: Array<{ count: number; product: Product }>;
}
export interface OrderGetters {
  cart: Array<{ count: number; product: Product }>;
  countProductsInCart: number;
  totalCostInCart: number;
}
export interface OrderActionContext
  extends ActionContext<OrderState, RootState> {
  getters: OrderGetters;
}
export const createInitialState = (): OrderState => ({
  cart: []
});

const getters: GetterFunc<OrderGetters, OrderState> = {
  cart: (state: OrderState) => state.cart,
  countProductsInCart: (state: OrderState) => {
    let total = 0;
    state.cart.forEach(item => (total += item.count));
    return total;
  },
  totalCostInCart: (state: OrderState) => {
    let total = 0;
    state.cart.forEach(item => {
      total += item.count * item.product.price;
    });

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
  },
  [OrderMutations.UPDATE_PRODUCT_IN_CART](
    state: OrderState,
    cartItem: { count: number; product: Product }
  ) {
    const item = state.cart.find(
      item => item.product.uuid === cartItem.product.uuid
    );
    if (item) {
      item.count = cartItem.count;
    }
  }
};
const actions: ActionFunc<OrderActions, OrderActionContext> = {
  [OrderActions.ADD_TO_CART]: async (
    { commit }: OrderActionContext,
    cartItem: { count: number; product: Product }
  ) => {
    commit(OrderMutations.ADD_TO_CART, cartItem);
  },
  [OrderActions.REMOVE_FROM_CART]: async (
    { commit }: OrderActionContext,
    cartItem: { count: number; product: Product }
  ) => {
    commit(OrderMutations.REMOVE_FROM_CART, cartItem);
  },
  [OrderActions.SEND_CART]: async (
    { commit, rootState }: OrderActionContext,
    order: { cart: Array<{ count: number; product: Product }>; remarks: string }
  ) => {
    try {
      const user = fb.db.doc(
        "users/" + rootState[ModuleNames.authModule].userProfile?.uuid
      );
      const cart = order.cart.map(cart => ({
        count: cart.count,
        product: fb.db.doc("products/" + cart.product.uuid)
      }));

      await fb.ordersCollection.add({
        date: new Date().toLocaleString(),
        user,
        remarks: order.remarks,
        cart,
        status: "new"
      });
      return commit(OrderMutations.CLEAR_CART);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  [OrderActions.UPDATE_PRODUCT_IN_CART]: async (
    { commit }: OrderActionContext,
    cartItem: { count: number; product: Product }
  ) => {
    commit(OrderMutations.UPDATE_PRODUCT_IN_CART, cartItem);
  },
  [OrderActions.REMOVE_ALL_FROM_CART]: async ({
    commit
  }: OrderActionContext) => {
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
