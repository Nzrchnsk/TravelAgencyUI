<template>
  <div class="place">
    <div class="container">
      <div class="row">
        <div class="col-md-3">{{ Place.id }}</div>
        <div class="col-md-3">{{ Place.name }}</div>
        <div class="col-md-3">{{ Place.description }}</div>
        <div class="col-md-3">{{ Place.address }}</div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Place",
  props: {
    Place: {}
  }
}
</script>

<style scoped>

</style>