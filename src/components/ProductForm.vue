<template>
  <div>
    <form class="register__form center content-inputs" @submit.prevent="save">
      <vs-input
        block
        v-model.trim="name"
        label="Nazwa"
        placeholder="Lody waniliowe"
        :state="$v.name.$error ? 'danger' : ''"
        @keypress="$v.name.$reset"
      >
        <template #message-danger v-if="$v.name.$error && !$v.name.required">
          Nazwa jest wymagana
        </template>
        <template
          #message-danger
          v-else-if="$v.name.$error && !$v.name.minLength"
        >
          Minimalna długość to 3 znaki
        </template>
      </vs-input>

      <!-- vuesax doesn't contain styles for textarea so created manually    -->
      <div
        class="vs-input-content vs-input-content--textarea vs-input-content--has-label"
      >
        <textarea class="vs-input" v-model.trim="description" />
        <label class="vs-input__label vs-input__label--label">Opis</label>
        <label class="vs-input__label" v-if="!description"
          >Skład: śmietanka, mleko odtłuszczone częściowo zagęszczone, cukier,
          żółtka jaj, naturalny aromat waniliowy</label
        >
      </div>
      <vs-input
        block
        type="url"
        v-model.trim="image"
        label="Link do zdjęcia"
        placeholder="https://www.google.com/"
      />
      <vs-input
        type="number"
        :step="0.01"
        v-model="price"
        label="Cena"
        :state="$v.price.$error ? 'danger' : ''"
        @keypress="$v.price.$reset"
      >
        <template #message-danger v-if="$v.price.$error && !$v.price.minValue">
          Minimalna cena to 0.01 zł
        </template>
      </vs-input>
      <vs-input
        type="number"
        v-model="grams"
        label="Waga porcji"
        :state="$v.grams.$error ? 'danger' : ''"
        @keypress="$v.grams.$reset"
      >
        <template #message-danger v-if="$v.grams.$error && !$v.grams.minValue">
          Minimalna waga to 1 g
        </template>
      </vs-input>

      <vs-row align="center">
        <vs-col type="flex" justify="flex-end">
          <vs-button flat primary animation-type="vertical">
            Zapisz
            <template #animate> <i class="bx bx-save"></i> </template>
          </vs-button>
        </vs-col>
      </vs-row>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Product } from "@/types/types";
import { validationMixin } from "vuelidate";
import { minLength, required, minValue } from "vuelidate/lib/validators";

@Component({
  components: {},
  mixins: [validationMixin],
  validations: {
    name: { required, minLength: minLength(3) },
    price: {
      minValue: minValue(0.01)
    },
    grams: {
      minValue: minValue(1)
    }
  }
})
export default class ProductForm extends Vue {
  @Prop() product!: Product;
  name = "";
  description = "";
  image = "";
  price = 0;
  grams = 0;

  created() {
    if (this.product) {
      this.name = this.product.name;
      this.description = this.product.description
        ? this.product.description
        : "";
      this.price = this.product.price;
      this.image = this.product.image ? this.product.image : "";
      this.grams = this.product.grams;
    }
  }
  get productObject(): Product {
    return {
      uuid: "",
      name: this.name,
      description: this.description,
      image: this.image,
      price: this.price,
      grams: this.grams,
      added: new Date().toDateString()
    };
  }

  save() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      this.$emit("submit", this.productObject);
    } else {
      this.$vs.notification({
        duration: 5000,
        flat: true,
        color: "danger",
        title: "Wprowadzono nieprawidłowe dane",
        text: "Popraw dane i spróbuj ponownie"
      });
    }
  }
  reset() {
    this.$v.$reset();
    this.name = "";
    this.description = "";
    this.image = "";
    this.price = 0;
    this.grams = 0;
  }
}
</script>
<style lang="scss" scoped>
.content-inputs {
  max-width: 500px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;

  & > div {
    margin-bottom: 25px;
  }
  .vs-input-content--textarea {
    textarea {
      width: 100%;
      height: 150px;
      font-family: Arial;
    }
    .vs-input__label {
      width: calc(100% - 20px);
      top: 0;
      height: 33px;
      &:nth-of-type(2) {
        height: auto;
        padding-top: 7px;
      }
    }
  }
}
</style>
