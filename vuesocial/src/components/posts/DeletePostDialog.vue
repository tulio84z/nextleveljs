<template>
  <span>

    <b-modal 
      :id="id"
      ref="myModal"
      hide-footer 
      title="Want to delete Post?"
    >
      <div class="d-block text-center">
        <h3>Are you sure ?</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="deletePost">Delete</b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="dismissModal">Cancel</b-button>
    </b-modal>
  </span>
</template>

<script>
  export default {
    props: ['post','id'],
    methods: {
      dismissModal() {

        this.$refs.myModal.hide()
      },
      deletePost() {

        this.$store.dispatch('deletePost', {id: this.post.id})
        this.$refs.myModal.hide()
        this.$router.push('/user')
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
