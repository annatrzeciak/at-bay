import * as ProductApi from "../api/product";
import { Product } from "@/types/types";
import { Commit } from "vuex";

export enum ProductActions {
  FETCH_LAST_ADDED_PRODUCTS = "fetchLastAddedProducts"
}
export enum ProductMutations {
  SET_LAST_ADDED_PRODUCTS = "SET_LAST_ADDED_PRODUCTS"
}

export interface ProductState {
  lastAddedProducts: Array<Product> | null;
}

export const createInitialState = (): ProductState => ({
  lastAddedProducts: null
});

const state = createInitialState();
export interface ProductGetters {
  lastAddedProducts: Array<Product>;
}
const getters = {
  lastAddedProducts: (state: ProductState) => state.lastAddedProducts
};
const mutations = {
  [ProductMutations.SET_LAST_ADDED_PRODUCTS](
    state: ProductState,
    products: Array<Product>
  ) {
    state.lastAddedProducts = products;
  }
  // [ProductMutations.SET_FOUND_PRODUCTS](state: ProductState, data) {
  //   state.foundProducts = data.products;
  // },
  // [ProductMutations.SET_SEARCH_VALUE](state: ProductState, value) {
  //   state.searchValue = value;
  // },
  // [ProductMutations.SET_OPENED_PRODUCT_ID](state: ProductState, value) {
  //   state.openedProductId = value;
  // },
  // [ProductMutations.SET_OPENED_PRODUCT_DETAILS](state: ProductState, data) {
  //   state.openedProductWithDetails = data.product;
  // }
};

const actions = {
  [ProductActions.FETCH_LAST_ADDED_PRODUCTS]: async ({
    commit
  }: {
    commit: Commit;
  }) => {
    return ProductApi.getLastAddedProducts()
      .then((products: Array<Product>) => {
        commit(ProductMutations.SET_LAST_ADDED_PRODUCTS, products);
        return Promise.resolve();
      })
      .catch((err: any) => Promise.reject(err));
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
