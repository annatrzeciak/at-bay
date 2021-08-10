<template>
  <div class="home">
    <header>
      <div class="content">
        <vs-row align="center">
          <vs-col w="4" sm="12" offset="7">
            <h1>Odkryj tradycyjne włoskie smaki</h1>
            <p>
              Nasze dusze podróżników i odkrywców, poprowadziły nas ku poznaniu
              i unowocześnieniu tradycyjnych receptur włoskich. Uważamy, że
              każda receptura nawet ta najbardziej tradycyjna powinna zostać
              dostosowana do wymagań współczesnej kultury życia.
            </p>
          </vs-col>
        </vs-row>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
header {
  min-height: calc(100vh - 44px);
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.3) 100%
    ),
    url("../assets/header.jpg");
  background-size: cover;
  background-position: center;
  padding: 15px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  text-shadow: black 0px 0px 6px;
  color: white;
  font-size: 20px;
  & > div {
    width: 100%;
    box-sizing: border-box;
    @media (max-width: 900px) {
      .vs-col--sm-12.vs-col--offset-7 {
        margin-left: 0%;
      }
    }
  }
}
</style>
