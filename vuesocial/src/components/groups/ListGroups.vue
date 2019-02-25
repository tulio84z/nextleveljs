<template>
  <div>
      <h1>All Groups</h1>
      <h6>Welcome to the Group Page! Select a Group that interests you!</h6>
      <b-button variant="info" @click="createGroup">Create Group</b-button>
      <group-item
        v-for="group in groups"
        v-bind:group="group"
        :key="group.id"
        >

      </group-item>

  </div>

</template>

<script>
export default {
  computed : {
    groups () {
      return this.$store.getters.groups
    }
  },
  methods: {
    createGroup () {
      this.$router.push('/group/new')
    }
  }


}
</script>

<style lang="css" scoped>
</style>
