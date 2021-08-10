<template>
  <svg class="svg-icon">
    <use :xlink:href="iconPath"></use>
  </svg>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Vue from "vue";

@Component
export default class SvgIcon extends Vue {
  @Prop() icon!: string;

  get iconPath() {
    return `icons.svg#${this.icon}`;
  }
}
</script>

<style scoped lang="scss">
.svg-icon {
  width: 20px;
  height: 20px;
}
</style>
