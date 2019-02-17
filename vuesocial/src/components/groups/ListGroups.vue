<template>
  <div>
      <h1>Groups</h1>
      <h6>Welcome to the Group Page! Select a Group that interests you!</h6>
      <b-button @click="createGroup">Create Group</b-button>
  </div>

</template>

<script>
export default {

  methods: {
    createGroup () {
      this.$router.push('/group/new')
    }
  }


}
</script>

<style lang="css" scoped>
</style>
