<template>
  <div class="">
    <h1>Detail Post Page</h1>
    {{post.message}}
  </div>

</template>

<script>
export default {
  props: ['id'],

  computed: {
    post() {

      return this.$store.getters.getPostById(this.id)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
