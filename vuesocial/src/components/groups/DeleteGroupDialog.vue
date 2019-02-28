<template>
    <b-modal 
      :id="id"
      ref="myModal"
      hide-footer 
      title="Want to delete Group?"
    >
      <div class="d-block text-center">
        <h3>Are you sure ?</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="deleteGroup">Delete</b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="dismissModal">Cancel</b-button>
    </b-modal>
</template>
<script>
export default {
    props: ['group','id'],
    methods: {
      dismissModal() {

        this.$refs.myModal.hide()
      },
      deleteGroup() {

        this.$store.dispatch('deleteGroup', {id: this.group.id})
        this.$refs.myModal.hide()
        this.$router.push('/user')
      }
    }
}
</script>

