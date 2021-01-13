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
              razem: <strong v-two-decimal-places>{{ total }}</strong> zł
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
                <span v-two-decimal-places>{{
                  item.count * item.product.price
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

@Component({ components: {} })
export default class Cart extends Vue {
  cart: Array<{ count: number; product: Product }> = [
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
  ];
  get total() {
    let total = 0;
    this.cart.forEach(item => {
      total += item.count * item.product.price;
    });
    return total;
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
