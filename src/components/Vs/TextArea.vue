<template>
  <!-- vuesax doesn't contain styles for textarea so i created manually    -->
  <div
    class="vs-input-content vs-input-content--textarea vs-input-content--has-label"
  >
    <textarea class="vs-input" v-model.trim="scratch" />
    <label class="vs-input__label vs-input__label--label">{{ label }}</label>
    <label class="vs-input__label" v-if="!scratch">{{ placeholder }}</label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({})
export default class TextArea extends Vue {
  @Prop({ required: true }) value!: string;
  @Prop({ required: false, default: "" }) placeholder!: string;
  @Prop({ required: false, default: "" }) label!: string;

  scratch = "";

  mounted() {
    this.scratch = this.value;
  }

  @Watch("scratch")
  changedScratch() {
    this.$emit("changed", this.scratch);
  }
}
</script>
<style lang="scss" scoped>
.vs-input-content--textarea {
  width: 100%;
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
</style>
