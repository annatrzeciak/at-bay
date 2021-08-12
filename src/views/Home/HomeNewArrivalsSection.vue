<template>
  <div class="tab-slider-product section">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
          <div class="section-header text-center">
            <h2 class="h2">Nowości</h2>
            <p>Zobacz ogromną różnorodność naszych produktów</p>
          </div>
          <div class="tabs-listing">
            <ul class="tabs clearfix">
              <li
                :class="{ active: openedTab === 'woman' }"
                @click="openedTab = 'woman'"
              >
                Kobieta
              </li>
              <li
                :class="{ active: openedTab === 'man' }"
                @click="openedTab = 'man'"
              >
                Mężczyzna
              </li>
              <li
                :class="{ active: openedTab === 'sale' }"
                @click="openedTab = 'sale'"
              >
                Wyprzedaż
              </li>
            </ul>
            <div class="tab_container">
              <div
                :class="[
                  'tab_content grid-products',
                  { 'd-block': openedTab === 'woman' }
                ]"
              >
                <div class="productSlider">
                  <div
                    class="col-12 item"
                    v-for="product in newArrivalsWoman"
                    :key="product.uuid"
                  >
                    <!-- start product image -->
                    <div class="product-image">
                      <!-- start product image -->
                      <router-link :to="'/produkty/' + product.uuid">
                        <!-- image -->
                        <img
                          class="primary blur-up lazyloaded"
                          :src="product.images[0]"
                          alt="image"
                          title="product"
                        />
                        <!-- End image -->
                        <!-- Hover image -->
                        <img
                          class="hover blur-up lazyloaded"
                          :src="product.images[1]"
                          alt="image"
                          title="product"
                        />
                        <!-- End hover image -->
                        <!-- product label -->
                        <div class="product-labels rectangular">
                          <span v-if="product.sale" class="lbl on-sale"
                            >-{{
                              Math.round(
                                100 - (product.sale / product.price) * 100
                              )
                            }}%</span
                          >
                          <span v-if="product.new" class="lbl pr-label1"
                            >new</span
                          >
                          <span v-if="product.hot" class="lbl pr-label2"
                            >Hot</span
                          >
                        </div>
                        <!-- End product label -->
                      </router-link>
                      <!-- end product image -->

                      <!-- Start product button -->
                      <div class="variants add">
                        <router-link
                          tag="button"
                          class="btn btn-addto-cart"
                          :to="'/produkty/' + product.uuid"
                        >
                          Więcej
                        </router-link>
                      </div>
                      <div class="button-set">
                        <button
                          @click="openedProduct = product"
                          title="Podgląc"
                          class="quick-view-popup quick-view"
                        >
                          <i class="fas fa-search-plus"></i>
                        </button>
                      </div>
                      <!-- end product button -->
                    </div>
                    <!-- end product image -->
                    <!--start product details -->
                    <div class="product-details text-center">
                      <!-- product name -->
                      <div class="product-name">
                        <router-link :to="'/produkty/' + product.uuid">
                          {{ product.name }}
                        </router-link>
                      </div>
                      <!-- End product name -->
                      <!-- product price -->

                      <div class="product-price">
                        <span v-if="product.sale" class="old-price"
                          >{{ product.price }} zł</span
                        >
                        <span class="price"
                          >{{
                            product.sale ? product.sale : product.price
                          }}
                          zł</span
                        >
                      </div>
                      <!-- End product price -->

                      <div class="product-review">
                        <i
                          v-for="i in product.stars"
                          class="fas fa-star"
                          :key="'star' + i + product.uuid"
                        ></i>
                        <i
                          v-for="i in 5 - product.stars"
                          class="far fa-star"
                          :key="'star-o' + i + product.uuid"
                        ></i>
                      </div>
                      <!-- Variant -->
                      <ul class="swatches">
                        <li
                          class="swatch medium rounded p-1"
                          v-for="color in product.options[0].colors"
                          :key="color.color + product.uuid"
                        >
                          <div
                            class="h-100 w-100 rounded-circle"
                            :style="'background-color: ' + color.color"
                          ></div>
                        </li>
                      </ul>
                      <!-- End Variant -->
                    </div>
                    <!-- End product details -->
                  </div>
                </div>
              </div>
              <div
                :class="[
                  'tab_content grid-products',
                  { 'd-block': openedTab === 'man' }
                ]"
              >
                <div class="productSlider">
                  <div
                    class="col-12 item"
                    v-for="product in newArrivalsMan"
                    :key="product.uuid"
                  >
                    <!-- start product image -->
                    <div class="product-image">
                      <!-- start product image -->
                      <router-link :to="'/produkty/' + product.uuid">
                        <!-- image -->
                        <img
                          class="primary blur-up lazyloaded"
                          :src="product.images[0]"
                          alt="image"
                          title="product"
                        />
                        <!-- End image -->
                        <!-- Hover image -->
                        <img
                          class="hover blur-up lazyloaded"
                          :src="product.images[1]"
                          alt="image"
                          title="product"
                        />
                        <!-- End hover image -->
                        <!-- product label -->
                        <div class="product-labels rectangular">
                          <span v-if="product.sale" class="lbl on-sale"
                            >-{{
                              Math.round(
                                100 - (product.sale / product.price) * 100
                              )
                            }}%</span
                          >
                          <span v-if="product.new" class="lbl pr-label1"
                            >new</span
                          >
                          <span v-if="product.hot" class="lbl pr-label2"
                            >Hot</span
                          >
                        </div>
                        <!-- End product label -->
                      </router-link>
                      <!-- end product image -->

                      <!-- Start product button -->
                      <div class="variants add">
                        <router-link
                          tag="button"
                          class="btn btn-addto-cart"
                          :to="'/produkty/' + product.uuid"
                        >
                          Więcej
                        </router-link>
                      </div>
                      <div class="button-set">
                        <button
                          @click="openedProduct = product"
                          title="Podgląc"
                          class="quick-view-popup quick-view"
                        >
                          <i class="fas fa-search-plus"></i>
                        </button>
                      </div>
                      <!-- end product button -->
                    </div>
                    <!-- end product image -->
                    <!--start product details -->
                    <div class="product-details text-center">
                      <!-- product name -->
                      <div class="product-name">
                        <router-link :to="'/produkty/' + product.uuid">{{
                          product.name
                        }}</router-link>
                      </div>
                      <!-- End product name -->
                      <!-- product price -->

                      <div class="product-price">
                        <span v-if="product.sale" class="old-price"
                          >{{ product.price }} zł</span
                        >
                        <span class="price"
                          >{{
                            product.sale ? product.sale : product.price
                          }}
                          zł</span
                        >
                      </div>
                      <!-- End product price -->

                      <div class="product-review">
                        <i
                          v-for="i in product.stars"
                          class="fas fa-star"
                          :key="'star' + i + product.uuid"
                        ></i>
                        <i
                          v-for="i in 5 - product.stars"
                          class="far fa-star"
                          :key="'star-o' + i + product.uuid"
                        ></i>
                      </div>
                      <!-- Variant -->
                      <ul class="swatches">
                        <li
                          class="swatch medium rounded p-1"
                          v-for="color in product.options[0].colors"
                          :key="color.color + product.uuid"
                        >
                          <div
                            class="h-100 w-100 rounded-circle"
                            :style="'background-color: ' + color.color"
                          ></div>
                        </li>
                      </ul>
                      <!-- End Variant -->
                    </div>
                    <!-- End product details -->
                  </div>
                </div>
              </div>
              <div
                :class="[
                  'tab_content grid-products',
                  { 'd-block': openedTab === 'sale' }
                ]"
              >
                <div class="productSlider">
                  <div
                    class="col-12 item"
                    v-for="product in newArrivalsSale"
                    :key="product.uuid"
                  >
                    <!-- start product image -->
                    <div class="product-image">
                      <!-- start product image -->
                      <router-link :to="'/produkty/' + product.uuid">
                        <!-- image -->
                        <img
                          class="primary blur-up lazyloaded"
                          :src="product.images[0]"
                          alt="image"
                          title="product"
                        />
                        <!-- End image -->
                        <!-- Hover image -->
                        <img
                          class="hover blur-up lazyloaded"
                          :src="product.images[1]"
                          alt="image"
                          title="product"
                        />
                        <!-- End hover image -->
                        <!-- product label -->
                        <div class="product-labels rectangular">
                          <span v-if="product.sale" class="lbl on-sale"
                            >-{{
                              Math.round(
                                100 - (product.sale / product.price) * 100
                              )
                            }}%</span
                          >
                          <span v-if="product.new" class="lbl pr-label1"
                            >new</span
                          >
                          <span v-if="product.hot" class="lbl pr-label2"
                            >Hot</span
                          >
                        </div>
                        <!-- End product label -->
                      </router-link>
                      <!-- end product image -->

                      <!-- Start product button -->
                      <div class="variants add">
                        <router-link
                          tag="button"
                          class="btn btn-addto-cart"
                          :to="'/produkty/' + product.uuid"
                        >
                          Więcej
                        </router-link>
                      </div>
                      <div class="button-set">
                        <button
                          @click="openedProduct = product"
                          title="Podgląc"
                          class="quick-view-popup quick-view"
                        >
                          <i class="fas fa-search-plus"></i>
                        </button>
                      </div>
                      <!-- end product button -->
                    </div>
                    <!-- end product image -->
                    <!--start product details -->
                    <div class="product-details text-center">
                      <!-- product name -->
                      <div class="product-name">
                        <router-link :to="'/produkty/' + product.uuid">{{
                          product.name
                        }}</router-link>
                      </div>
                      <!-- End product name -->
                      <!-- product price -->

                      <div class="product-price">
                        <span v-if="product.sale" class="old-price"
                          >{{ product.price }} zł</span
                        >
                        <span class="price"
                          >{{
                            product.sale ? product.sale : product.price
                          }}
                          zł</span
                        >
                      </div>
                      <!-- End product price -->

                      <div class="product-review">
                        <i
                          v-for="i in product.stars"
                          class="fas fa-star"
                          :key="'star' + i + product.uuid"
                        ></i>
                        <i
                          v-for="i in 5 - product.stars"
                          class="far fa-star"
                          :key="'star-o' + i + product.uuid"
                        ></i>
                      </div>
                      <!-- Variant -->
                      <ul class="swatches">
                        <li
                          class="swatch medium rounded p-1"
                          v-for="color in product.options[0].colors"
                          :key="color.color + product.uuid"
                        >
                          <div
                            class="h-100 w-100 rounded-circle"
                            :style="'background-color: ' + color.color"
                          ></div>
                        </li>
                      </ul>
                      <!-- End Variant -->
                    </div>
                    <!-- End product details -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <product-preview :product="openedProduct" @close="openedProduct = null" />
  </div>
</template>

<script lang="ts">
import $ from "jquery";
import "slick-carousel";
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import ProductPreview from "@/components/ProductPreview.vue";
import { Product } from "@/types/types";
const productsModule = namespace("product");

@Component({
  components: { ProductPreview }
})
export default class HomeNewArrivalsSection extends Vue {
  @productsModule.Getter("newArrivalsWoman") newArrivalsWoman!: Array<
    Product
  > | null;
  @productsModule.Getter("newArrivalsMan") newArrivalsMan!: Array<
    Product
  > | null;
  @productsModule.Getter("newArrivalsSale") newArrivalsSale!: Array<
    Product
  > | null;
  @productsModule.Getter("products") products!: Array<Product> | null;
  @productsModule.Action("fetchProducts") fetchProducts!: any;

  openedProduct = null;
  openedTab = "woman";
  mounted() {
    if (!this.products) {
      this.fetchProducts().then(this.generateSlick);
    } else {
      this.generateSlick();
    }
  }
  generateSlick() {
    ($(".productSlider") as any).slick({
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: '<span class="slide__button slide__button--prev ">〈</span>',
      nextArrow: '<span class="slide__button slide__button--next ">〉</span>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
  @Watch("openedTab")
  changedOpenedTab() {
    ($(".productSlider") as any).slick("refresh");
  }
}
</script>
<style lang="scss" scoped>
.productSlider {
  &::v-deep .slide__button {
    color: #929292;
    opacity: 0.7;
    font-size: 30px;
    cursor: pointer;
    position: absolute;
    top: calc(50% - 15px);
    z-index: 100;
    &:hover {
      opacity: 1;
    }
    &--prev {
      left: -30px;
    }
    &--next {
      right: -30px;
    }
  }
}
.product-image {
  img {
    height: 400px;
    object-fit: cover;
    object-position: center;
  }
}
</style>
