import * as fb from "@/firebase";
import { Product } from "@/types/types";
import { Commit, Dispatch } from "vuex";

export enum ProductActions {
  FETCH_PRODUCTS = "fetchProducts",
  SAVE_PRODUCT = "saveProduct"
}
export enum ProductMutations {
  SET_PRODUCTS = "setProducts"
}

export interface ProductState {
  lastAddedProducts: Array<Product> | null;
  products: Array<Product> | null;
}

export const createInitialState = (): ProductState => ({
  lastAddedProducts: null,
  products: null
});

const state = createInitialState();
const getters = {
  lastAddedProducts: (state: ProductState) => state.lastAddedProducts,
  products: (state: ProductState) => state.products
};
const mutations = {
  [ProductMutations.SET_PRODUCTS](
    state: ProductState,
    products: Array<Product>
  ) {
    state.products = products;
  }
};

const actions = {
  [ProductActions.FETCH_PRODUCTS]: async ({ commit }: { commit: Commit }) => {
    try {
      const collection = await fb.productsCollection.get();
      const products = collection.docs.map((doc: any) => {
        return { uuid: doc.id, ...doc.data() };
      });
      commit(ProductMutations.SET_PRODUCTS, products);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
  [ProductActions.SAVE_PRODUCT]: (
    { commit }: { commit: Commit },
    product: Product
  ) => {
    try {
      return fb.productsCollection.add({
        name: product.name,
        description: product.description,
        price: product.price,
        grams: product.grams,
        image: product.image,
        added: product.added
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
