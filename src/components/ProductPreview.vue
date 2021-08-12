<template>
  <transition name="fade">
    <div
      class="modal fade quick-view-popup show"
      id="content_quickview"
      v-if="product"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div
              id="ProductSection-product-template"
              class="product-template__container prstyle1"
            >
              <div class="product-single">
                <!-- Start model close -->
                <div
                  class="model-close-btn pull-right"
                  title="close"
                  @click="$emit('close')"
                >
                  <i class="fas fa-times"></i>
                </div>
                <!-- End model close -->
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="product-details-img">
                      <div class="pl-20">
                        <img :src="product.images[0]" alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="product-single__meta">
                      <h2 class="product-single__title">
                        {{ product.name }}
                      </h2>
                      <div class="prInfoRow">
                        <div class="product-stock">
                          <span class="instock" v-if="availableCount"
                            >Dostępna ilość: {{ availableCount }}</span
                          >
                          <span v-else class="outstock">Niedostępne</span>
                        </div>
                        <div class="product-sku">
                          SKU: <span class="variant-sku">{{ product.uuid }}</span>
                        </div>
                      </div>
                      <p
                        class="product-single__price product-single__price-product-template"
                      >
                        <s
                          v-if="product.sale"
                          id="ComparePrice-product-template"
                          ><span class="money">{{ product.price }} zł</span></s
                        >
                        <span
                          :class="[
                            'product-price__price product-price__price-product-template product-price__sale--single',
                            { 'product-price__sale': product.sale }
                          ]"
                        >
                          <span id="ProductPrice-product-template"
                            ><span class="money">
                              {{ product.sale ? product.sale : product.price }}
                              zł
                            </span></span
                          >
                        </span>
                      </p>
                      <div
                        class="product-single__description rte"
                        v-html="product.description"
                      ></div>

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
                              <span class="slVariant">{{
                                selectedSize
                              }}</span></label
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
                          <div class="product-form__item">
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
                              :disabled="
                                !selectedColor || !selectedSize || !count
                              "
                            >
                              <span>Dodaj do koszyka</span>
                            </button>
                          </div>
                        </div>
                        <!-- End Product Action -->
                      </div>
                    </div>
                  </div>
                </div>
                <!--End-product-single-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import translateToPolish from "@/utils/translations";

@Component({ components: {} })
export default class ProductPreview extends Vue {
  @Prop() product!: any;
  count = 1;
  selectedColor = "";
  selectedSize = "";
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
    const availableColor = this.selectedSizeOption.colors.find(
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
  get availableCount() {
    if (this.selectedSizeOption && this.selectedColor) {
      const selectedColor = this.selectedSizeOption.colors.find(
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

  mounted() {
    this.setDefaultValues();
  }
  @Watch("selectedSize")
  changedSize() {
    this.setDefaultColor();
  }
  @Watch("product")
  changedProduct() {
    this.setDefaultValues();
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
#content_quickview.modal {
  height: 100vh;
  width: 100vw;
  top: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  background-color: rgba(0, 0, 0, 0.5);
}

</style>
