<template>
  <div id="page-content">
    <div class="slideshow slideshow-wrapper pb-section sliderFull">
      <div class="home-slideshow">
        <div class="slide">
          <div class="blur-up lazyloaded bg-size">
            <img
              class="blur-up lazyloaded bg-img"
              src="../assets/images/slideshow-banners/belle-banner1.jpg"
              alt="Zobacz naszą nową kolekcję"
              title="Zobacz naszą nową kolekcję"
            />
            <div class="slideshow__text-wrap slideshow__overlay classic bottom">
              <div class="slideshow__text-content bottom">
                <div class="wrap-caption center">
                  <h2 class="h1 mega-title slideshow__title">
                    Zobacz naszą nową kolekcję
                  </h2>
                  <span class="mega-subtitle slideshow__subtitle"
                    >Dla wysokich i niskich, klasyczne lub nowoczesne. Każdy coś
                    dla siebie znajdzie</span
                  >
                  <router-link :to="{ name: 'Products' }" tag="span" class="btn"
                    >Zobacz</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="slide">
          <div class="blur-up lazyloaded bg-size">
            <img
              class="blur-up lazyloaded bg-img"
              src="../assets/images/slideshow-banners/belle-banner2.jpg"
              alt="Letnia kolekcja bikini"
              title="Letnia kolekcja bikini"
            />
            <div class="slideshow__text-wrap slideshow__overlay classic bottom">
              <div class="slideshow__text-content bottom">
                <div class="wrap-caption center">
                  <h2 class="h1 mega-title slideshow__title">
                    Letnia kolekcja bikini
                  </h2>
                  <span class="mega-subtitle slideshow__subtitle"
                    >Zaoszczędź do 50% tylko w ten weekend</span
                  >
                  <router-link :to="{ name: 'Products' }" tag="span" class="btn"
                    >Zobacz</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <home-new-arrivals-section />
  </div>
</template>

<script lang="ts">
import $ from "jquery";
import "slick-carousel";
import { Component, Vue } from "vue-property-decorator";
import HomeNewArrivalsSection from "@/views/Home/HomeNewArrivalsSection.vue";

@Component({
  components: { HomeNewArrivalsSection }
})
export default class Home extends Vue {
  mounted(): void {
    ($(".home-slideshow") as any).slick({
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 4000,
      lazyLoad: "ondemand"
    });
  }
}
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>