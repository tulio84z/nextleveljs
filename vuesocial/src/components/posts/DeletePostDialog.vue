<template>
  <span>

    <b-button @click="showModal">Delete Post</b-button>

    <b-modal ref="myModalRef" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="deletePost">Delete</b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="dismissModal">Cancel</b-button>
    </b-modal>
  </span>
</template>

<script>
  export default {
    props: ['post'],
    methods: {
      showModal() {
        this.$refs.myModalRef.show()
      },
      dismissModal() {
        this.$refs.myModalRef.hide()
      },
      deletePost() {

        this.$store.dispatch('deletePost', {id: this.post.id})
        this.$refs.myModalRef.hide()
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
