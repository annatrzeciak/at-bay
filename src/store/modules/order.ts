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
  cart: [
    {
      count: 1,
      product: {
        uuid: "",
        description:
          "Skład: \nwoda\t\nŚMIETANA kremówka\t\ncukier\t\nczekolada w płatkach - 9% (cukier. miazga kakaowa. tłuszcz kakaowy. lecytyna sojowa (E 322))\t\naromat\t\nodtłuszczone mleko w proszku\t\nziemniaczany syrop glukozowy\t\nkakao o obniżonej zawartości tłuszczu\t\njaja\t\nmasło z mleka\t\ntłuszcz kokosowy\t\nemulgator Mono- i diglicerydy kwasów tłuszczowych E-471\t\nstabilizatory (mączka chleba świętojańskiego (E 410). guma guar (E412))",
        grams: 300,
        image:
          "https://cdn9.beszamel.smcloud.net/t/thumbs/660/441/1/recipes/photo/jak_zrobic_lody_czekoladowe_podajemy.jpg",
        name: "Loxcvbnmadowe",
        price: 3.8,
        added: new Date().toDateString()
      }
    },
    {
      count: 1,
      product: {
        uuid: "",
        description:
          "Skład: \nwoda\t\nŚMIETANA kremówka\t\ncukier\t\nczekolada w płatkach - 9% (cukier. miazga kakaowa. tłuszcz kakaowy. lecytyna sojowa (E 322))\t\naromat\t\nodtłuszczone mleko w proszku\t\nziemniaczany syrop glukozowy\t\nkakao o obniżonej zawartości tłuszczu\t\njaja\t\nmasło z mleka\t\ntłuszcz kokosowy\t\nemulgator Mono- i diglicerydy kwasów tłuszczowych E-471\t\nstabilizatory (mączka chleba świętojańskiego (E 410). guma guar (E412))",
        grams: 300,
        image:
          "https://cdn9.beszamel.smcloud.net/t/thumbs/660/441/1/recipes/photo/jak_zrobic_lody_czekoladowe_podajemy.jpg",
        name: "Lody czekoladowe",
        price: 3.8,
        added: new Date().toDateString()
      }
    },
    {
      count: 2,
      product: {
        uuid: "Txo37m4QdyUVK1R6luTT",
        name: "Lody pistacjowe ",
        image:
          "https://1.bp.blogspot.com/-crBaydjCJWQ/VVYLW5wI04I/AAAAAAAACm8/FPFyJillIA8/s1600/IMG_7593.JPG",
        grams: 300,
        price: 3.9,
        description:
          "Skład: \nśmietanę kremówkę, wodę, cukier, ziemniaczany syrop glukozowy, odtłuszczone mleko w proszku, orzechy włoskie - 4%, masło z mleka, tłuszcz kokosowy, jaja, oraz emulgatory i stabilizatory. Barwę produktowi nadaje karmel, natomiast zapach aromat. Szkoda, że dodatek orzechów włoskich jest tak niski.",
        added: new Date().toDateString()
      }
    }
  ]
});

const getters = {
  cart: (state: OrderState) => state.cart,
  productsInCart: (state: OrderState) => {
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
    state.cart.push(cartItem);
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
    commit(OrderMutations.REMOVE_FROM_CART, cartItem);
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
