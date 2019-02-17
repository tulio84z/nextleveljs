<template>
  <div>
      <h1>List Post Page</h1>
      <b-button @click="createPost">Create Post</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    createPost () {
      this.$router.push('/post/new')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
