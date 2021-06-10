<template>
  <div class="List">
    <Place v-for="(Place, index) in PlaceList.data" :key="index" v-bind:Place="Place"/>
  </div>
</template>

<script>
import db from './db';
import Place from "./Place";

export default {
  name: "PlaceList",
  data() {
    return {
      PlaceList: []
    };
  },
  async mounted() {
    this.PlaceList = await db.Get("Place?", [[]]);
  },
  components: {
    Place
  }
};
</script>

<style scoped>

</style>