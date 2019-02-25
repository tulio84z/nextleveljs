<template>
  <div class="">
    <h1>
      Update Post
    </h1>
    <my-post-form
      :post="mypost"
    >
    </my-post-form>
  </div>

</template>

<script>
export default {
  props: ['id'],
  computed: {
    mypost(){
      console.log(this.id)
      return this.$store.getters.getPostById(this.id)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
