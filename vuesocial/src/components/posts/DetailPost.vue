<template>
  <div class="">
    <h1>Detail Post Page</h1>
    {{post.message}}
    <br>
    <delete-post-item-dialog
      v-if="isOwner"
      v-bind:post="post"

    >
    </delete-post-item-dialog>
  </div>

</template>

<script>
export default {
  props: ['id'],

  computed: {
    post() {

      return this.$store.getters.getPostById(this.id)
    },
    isOwner() {
      if (this.$store.getters.user){
        return this.$store.getters.user.id === this.post.creatorId
      }
    },
  }
}
</script>

<style lang="css" scoped>
</style>
