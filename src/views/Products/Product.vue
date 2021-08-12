<template>
  <div class="pageWrapper template-product">
    <div id="page-content">
      <div id="MainContent" class="main-content" role="main">
        <div
          id="ProductSection-product-template"
          class="product-template__container prstyle1 container"
        >
          <div class="product-single mt-4">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                <div class="product-details-img">
                  <div class="product-thumb">
                    <div
                      id="gallery"
                      class="product-dec-slider-2 product-tab-left"
                    >
                      <img
                        v-for="(image, i) in product.images"
                        :key="image"
                        :class="[
                          'blur-up lazyloaded',
                          { selected: selectedPhoto === image }
                        ]"
                        :src="image"
                        :alt="product.name + ' zdjęcie ' + i"
                        @click="selectedPhoto = image"
                      />
                    </div>
                  </div>
                  <div class="zoompro-wrap product-zoom-right pl-20">
                    <div class="zoompro-span">
                      <img
                        class="blur-up lazyloaded"
                        alt=""
                        :src="selectedPhoto"
                      />
                    </div>
                    <div class="product-labels rectangular">
                      <span v-if="product.sale" class="lbl on-sale"
                        >-{{
                          Math.round(
                            100 - (product.sale / product.price) * 100
                          )
                        }}%</span
                      >
                      <span v-if="product.new" class="lbl pr-label1">new</span>
                      <span v-if="product.hot" class="lbl pr-label2">Hot</span>
                    </div>
                    <div class="product-buttons">
                      <button class="btn prlightbox" title="Zoom">
                        <i class="fas fa-expand-arrows-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                <div class="product-single__meta">
                  <h1 class="product-single__title">{{ product.name }}</h1>
                  <div class="prInfoRow">
                    <div class="product-sku">
                      SKU: <span class="variant-sku">{{ product.uuid }}</span>
                    </div>
                    <div class="product-review">
                      <a class="reviewLink" href="#tab2">
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
                        <!--                        <span class="spr-badge-caption">6 reviews</span>-->
                      </a>
                    </div>
                  </div>
                  <p
                    class="product-single__price product-single__price-product-template"
                  >
                    <span class="visually-hidden">Regular price</span>
                    <s id="ComparePrice-product-template" v-if="product.sale"
                      ><span class="money">{{ product.price }} zł</span></s
                    >
                    <span
                      :class="[
                        'product-price__price product-price__price-product-template  product-price__sale--single',
                        { 'product-price__sale': product.sale }
                      ]"
                    >
                      <span id="ProductPrice-product-template"
                        ><span class="money">
                          {{ product.sale ? product.sale : product.price }}
                          zł</span
                        ></span
                      >
                    </span>
                    <span class="discount-badge" v-if="product.sale">
                      <span class="devider">|</span>&nbsp;
                      <span>Zaoszczęcisz </span>
                      <span
                        id="SaveAmount-product-template"
                        class="product-single__save-amount"
                      >
                        <span class="money"
                          >{{ product.price - product.sale }} zł</span
                        >
                      </span>
                      <span class="off">
                        (<span>{{
                          Math.round(100 - (product.sale / product.price) * 100)
                        }}</span
                        >%)</span
                      >
                    </span>
                  </p>
                </div>
                <div
                  class="product-single__description rte"
                  v-html="product.description"
                ></div>
                <div id="quantity_message" v-if="availableCount">
                  <template v-if="availableCount < 5">
                    Śpiesz się! Dostępne tylko
                    <span class="items">{{ availableCount }}</span>
                    {{ availableCountLabel }}.
                  </template>
                  <template v-else>
                    Dostępne
                    <span class="items">{{ availableCount }}</span>
                    {{ availableCountLabel }}.
                  </template>
                </div>

                <div
                  class="product-form product-form-product-template hidedropdown"
                >
                  <div
                    class="swatch clearfix swatch-1 option2"
                    data-option-index="1"
                  >
                    <div class="product-form__item">
                      <label class="header"
                        >Rozmiar:
                        <span class="slVariant">{{ selectedSize }}</span></label
                      >
                      <div
                        v-for="option in product.options"
                        :key="option.size"
                        class="swatch-element available"
                      >
                        <input
                          :id="'size_' + option.size"
                          class="swatchInput"
                          type="radio"
                          name="size"
                          v-model="selectedSize"
                          :value="option.size"
                        />
                        <label
                          :for="'size_' + option.size"
                          class="swatchLbl medium rectangle"
                          :title="option.size"
                          >{{ option.size.toUpperCase() }}</label
                        >
                      </div>
                    </div>
                  </div>
                  <div
                    class="swatch clearfix swatch-0 option1"
                    data-option-index="0"
                  >
                    <div class="product-form__item" v-if="selectedSizeOption">
                      <label class="header"
                        >Kolor:
                        <span class="slVariant">{{
                          getTranslation(selectedColor)
                        }}</span></label
                      >
                      <div
                        v-for="option in selectedSizeOption.colors"
                        :key="option.color"
                        class="swatch-element color available p-1"
                      >
                        <input
                          :id="'color_' + option.color"
                          :disabled="!option.count"
                          class="swatchInput"
                          type="radio"
                          name="color"
                          v-model="selectedColor"
                          :value="option.color"
                        />
                        <label
                          :for="'color_' + option.color"
                          class="swatchLbl color medium rectangle"
                          :style="'background-color:' + option.color"
                          :title="getTranslation(option.color)"
                        ></label>
                      </div>
                    </div>
                  </div>
                  <!-- Product Action -->
                  <div class="product-action clearfix">
                    <div class="product-form__item--quantity">
                      <div class="wrapQtyBtn">
                        <div class="qtyField">
                          <div
                            :class="[
                              'qtyBtn minus c-pointer',
                              { disabled: !count }
                            ]"
                            class="qtyBtn minus c-pointer"
                            @click="subtractFromCount"
                          >
                            <i class="fas fa-minus"></i>
                          </div>
                          <input
                            type="number"
                            id="Quantity"
                            name="quantity"
                            v-model="count"
                            class="product-form__input qty"
                          />
                          <div
                            :class="[
                              'qtyBtn plus c-pointer',
                              { disabled: count === availableCount }
                            ]"
                            @click="addToCount"
                          >
                            <i class="fas fa-plus"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="product-form__item--submit">
                      <button
                        type="button"
                        name="add"
                        class="btn product-form__cart-submit"
                        :disabled="!selectedColor || !selectedSize || !count"
                      >
                        <span>Dodaj do koszyka</span>
                      </button>
                    </div>
                  </div>
                  <!-- End Product Action -->
                </div>

                <p id="freeShipMsg" class="freeShipMsg text-uppercase d-flex">
                  <span class="mr-1">
                    <i class="fa fa-truck"></i>
                  </span>
                  <span
                    >Złóż zamówienie za minimum
                    <b class="freeShip"><span class="money">100 zł</span></b>
                    a my wyślemy je do Ciebie <b>za darmo!</b></span
                  >
                </p>
              </div>
            </div>
          </div>
          <!--End-product-single-->
          <!--Product Fearure-->
          <div class="prFeatures">
            <div class="row">
              <div class="col-12 col-sm-6 col-md-3 col-lg-3 feature">
                <img
                  src="../../assets/images/credit-card.png"
                  alt="Safe Payment"
                  title="Safe Payment"
                />
                <div class="details">
                  <h3>BEZPIECZNE PŁATNOŚCI</h3>
                  Płać za pomocą większości metod płatności na świecie.
                </div>
              </div>
              <div class="col-12 col-sm-6 col-md-3 col-lg-3 feature">
                <img
                  src="../../assets/images/shield.png"
                  alt="Confidence"
                  title="Confidence"
                />
                <div class="details">
                  <h3>ZAUFANIE</h3>
                  Chromimy Twój zakup i dane osobowe.
                </div>
              </div>
              <div class="col-12 col-sm-6 col-md-3 col-lg-3 feature">
                <img
                  src="../../assets/images/worldwide.png"
                  alt="Worldwide Delivery"
                  title="Worldwide Delivery"
                />
                <div class="details">
                  <h3>DOSTAWA NA CAŁY ŚWIAT</h3>
                  BEZPŁATNA i szybka wysyłka do ponad 200 krajów i regionów.
                </div>
              </div>
              <div class="col-12 col-sm-6 col-md-3 col-lg-3 feature">
                <img
                  src="../../assets/images/phone-call.png"
                  alt="Hotline"
                  title="Hotline"
                />
                <div class="details">
                  <h3>BOK</h3>
                  Skontaktuj się z BOK pod numerem
                  <span class="text-nowrap">123 456 789</span>
                </div>
              </div>
            </div>
          </div>
          <!--End Product Fearure-->
          <!--Product Tabs-->
          <div class="tabs-listing">
            <ul class="product-tabs">
              <li
                :class="{ active: openedTab === 'details' }"
                @click="openedTab = 'details'"
              >
                <div class="tablink">SZCZEGÓŁY</div>
              </li>
              <!-- TODO: Add reviews to product              -->
              <!--              <li-->
              <!--                :class="{ active: openedTab === 'reviews' }"-->
              <!--                @click="openedTab = 'reviews'"-->
              <!--              >-->
              <!--                <div class="tablink">OPINIE</div>-->
              <!--              </li>-->
              <li
                :class="{ active: openedTab === 'sizes' }"
                @click="openedTab = 'sizes'"
              >
                <div class="tablink">Tabela rozmiarów</div>
              </li>
              <li
                :class="{ active: openedTab === 'returns' }"
                @click="openedTab = 'returns'"
              >
                <div class="tablink">Zakup &amp; Zwrot</div>
              </li>
            </ul>
            <div class="tab-container">
              <div
                :class="['tab-content', { 'd-block': openedTab === 'details' }]"
              >
                <div
                  class="product-description rte"
                  v-html="product.fullDescription"
                ></div>
              </div>

              <div
                :class="['tab-content', { 'd-block': openedTab === 'sizes' }]"
              >
                <!-- TODO: Add sizes to db and generate table -->
                <h3>TABELA ROZMIARÓW - KOBIETA</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>Rozmiar</th>
                      <th>XS</th>
                      <th>S</th>
                      <th>M</th>
                      <th>L</th>
                      <th>XL</th>
                    </tr>
                    <tr>
                      <td>Chest</td>
                      <td>31" - 33"</td>
                      <td>33" - 35"</td>
                      <td>35" - 37"</td>
                      <td>37" - 39"</td>
                      <td>39" - 42"</td>
                    </tr>
                    <tr>
                      <td>Waist</td>
                      <td>24" - 26"</td>
                      <td>26" - 28"</td>
                      <td>28" - 30"</td>
                      <td>30" - 32"</td>
                      <td>32" - 35"</td>
                    </tr>
                    <tr>
                      <td>Hip</td>
                      <td>34" - 36"</td>
                      <td>36" - 38"</td>
                      <td>38" - 40"</td>
                      <td>40" - 42"</td>
                      <td>42" - 44"</td>
                    </tr>
                    <tr>
                      <td>Regular inseam</td>
                      <td>30"</td>
                      <td>30½"</td>
                      <td>31"</td>
                      <td>31½"</td>
                      <td>32"</td>
                    </tr>
                    <tr>
                      <td>Long (Tall) Inseam</td>
                      <td>31½"</td>
                      <td>32"</td>
                      <td>32½"</td>
                      <td>33"</td>
                      <td>33½"</td>
                    </tr>
                  </tbody>
                </table>
                <h3>TABELA ROZMIARÓW - MĘŻCZYZNA</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>Size</th>
                      <th>XS</th>
                      <th>S</th>
                      <th>M</th>
                      <th>L</th>
                      <th>XL</th>
                      <th>XXL</th>
                    </tr>
                    <tr>
                      <td>Chest</td>
                      <td>33" - 36"</td>
                      <td>36" - 39"</td>
                      <td>39" - 41"</td>
                      <td>41" - 43"</td>
                      <td>43" - 46"</td>
                      <td>46" - 49"</td>
                    </tr>
                    <tr>
                      <td>Waist</td>
                      <td>27" - 30"</td>
                      <td>30" - 33"</td>
                      <td>33" - 35"</td>
                      <td>36" - 38"</td>
                      <td>38" - 42"</td>
                      <td>42" - 45"</td>
                    </tr>
                    <tr>
                      <td>Hip</td>
                      <td>33" - 36"</td>
                      <td>36" - 39"</td>
                      <td>39" - 41"</td>
                      <td>41" - 43"</td>
                      <td>43" - 46"</td>
                      <td>46" - 49"</td>
                    </tr>
                  </tbody>
                </table>
                <div class="text-center">
                  <img src="../../assets/images/size.jpg" alt="" />
                </div>
              </div>

              <div
                :class="['tab-content', { 'd-block': openedTab === 'returns' }]"
              >
                <h4>Regulamin zwrotów</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  eros justo, accumsan non dui sit amet. Phasellus semper
                  volutpat mi sed imperdiet. Ut odio lectus, vulputate non ex
                  non, mattis sollicitudin purus. Mauris consequat justo a enim
                  interdum, in consequat dolor accumsan. Nulla iaculis diam
                  purus, ut vehicula leo efficitur at.
                </p>
                <p>
                  Interdum et malesuada fames ac ante ipsum primis in faucibus.
                  In blandit nunc enim, sit amet pharetra erat aliquet ac.
                </p>
                <h4>Regulamin zakupów</h4>
                <p>
                  Pellentesque ultrices ut sem sit amet lacinia. Sed nisi dui,
                  ultrices ut turpis pulvinar. Sed fringilla ex eget lorem
                  consectetur, consectetur blandit lacus varius. Duis vel
                  scelerisque elit, et vestibulum metus. Integer sit amet
                  tincidunt tortor. Ut lacinia ullamcorper massa, a fermentum
                  arcu vehicula ut. Ut efficitur faucibus dui Nullam tristique
                  dolor eget turpis consequat varius. Quisque a interdum augue.
                  Nam ut nibh mauris.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import translateToPolish from "@/utils/translations";
const productsModule = namespace("product");

@Component({
  components: {}
})
export default class Product extends Vue {
  @productsModule.Getter("getProductByUuid") getProductByUuid!: any;
  @productsModule.Getter("products") products!: Array<Product> | null;
  @productsModule.Action("fetchProducts") fetchProducts!: any;

  selectedPhoto = "";
  count = 1;
  selectedColor = "";
  selectedSize = "";
  openedTab = "details";

  get product() {
    return this.getProductByUuid(this.$route.params.uuid);
  }
  subtractFromCount() {
    if (this.count > 0) {
      --this.count;
    }
  }
  addToCount() {
    if (this.count < this.availableCount) {
      ++this.count;
    }
  }
  getTranslation(string: string) {
    return translateToPolish(string);
  }
  setDefaultColor() {
    const availableColor = this.selectedSizeOption?.colors.find(
      (color: any) => color.count
    );
    if (availableColor) {
      this.selectedColor = availableColor.color;
    } else {
      this.selectedColor = "";
    }
  }
  setDefaultValues() {
    if (this.product) {
      this.count = 1;
      this.selectedSize = this.product.options[0].size;
      this.setDefaultColor();
    }
  }
  get selectedSizeOption() {
    if (!this.product) return null;
    return this.product.options.find(
      (option: any) => option.size === this.selectedSize
    );
  }
  get availableCountLabel(): string {
    if (!this.availableCount) return "";
    if (this.availableCount === 1) return "sztuka";
    if (this.availableCount < 5) return "sztuki";
    return "sztuk";
  }
  get availableCount() {
    if (this.selectedSizeOption && this.selectedColor) {
      const selectedColor = this.selectedSizeOption?.colors.find(
        (color: any) => color.color === this.selectedColor
      );
      if (selectedColor) {
        if (this.count > selectedColor.count) {
          this.count = selectedColor.count;
        }
        return selectedColor.count;
      }
    }
    return null;
  }
  created() {
    if (!this.products) {
      this.fetchProducts();
    } else {
      this.selectedPhoto = this.product.images[0];
    }
  }
  mounted() {
    this.setDefaultValues();
  }
  @Watch("product")
  changedProduct() {
    this.selectedPhoto = this.product.images[0];
    this.setDefaultValues();
  }

  @Watch("selectedSize")
  changedSize() {
    this.setDefaultColor();
  }
  @Watch("count")
  changedCount() {
    if (this.count > this.availableCount) {
      this.count = this.availableCount;
    } else if (this.count < 0) {
      this.count = 0;
    }
  }
}
</script>
<style lang="scss" scoped>
.product-thumb {
  img {
    border: 2px solid white;
    cursor: pointer;

    &:hover,
    &.selected {
      transition: 0.3s;
      border-color: black;
    }
  }
}
</style>
