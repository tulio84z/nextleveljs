<template>
  <div>
    <h1>Detail Group Page</h1>
    <h2>{{group.name}}</h2>
    <h6>{{group.description}}</h6>
    <join-group-dialog
      v-bind:group="group"

    >
    </join-group-dialog>

  </div>

</template>

<script>
export default {
  props: ['id'],
  computed: {
    user() {
      return this.$store.getters.user
    },
    group() {
      return this.$store.getters.getGroupById(this.id)
    },
  },
}
</script>

<style lang="css" scoped>
</style>
