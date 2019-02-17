<template>
  <div>
      <h1>List Group Page</h1>
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
