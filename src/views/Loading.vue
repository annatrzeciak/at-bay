<template>
  <div :class="['loading', { 'loading--visible': loading }]">
    <div class="loading__spinner">
      <svg
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        stroke="#000"
      >
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="2">
            <circle stroke-opacity=".25" cx="18" cy="18" r="18" />
            <path
              d="M36 18c0-9.94-8.06-18-18-18"
              transform="rotate(195.438 18 18)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    </div>
    <div class="loading__text">Ładowanie...</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const appModule = namespace("app");

@Component({
  components: {}
})
export default class Loading extends Vue {
  @appModule.State("loading") loading: any;
}
</script>
<style lang="scss" scoped>
.loading {
  z-index: -1;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #34393e;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transition: opacity 0.3s, z-index 0s 0.3s;
  color: white;
}
.loading--visible {
  opacity: 0.95;
  z-index: 100000;
  transition: opacity 0.3s;
}
.loading__spinner svg {
  stroke: white;
  margin-bottom: 16px;
}
</style>
