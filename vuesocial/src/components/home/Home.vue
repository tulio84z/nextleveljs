<template>
  <div>

    <h1>Welcome to The Tech Articles Network!</h1>
    <h3>The best comunity to share your knowledge on technical topics!</h3>
    <h3 v-if="!userIsAuthenticated">Login or Sign-up for free to get started!</h3>


  </div>

</template>

<script>
export default {
  computed: {
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
  }

}
</script>
<style>


</style>
