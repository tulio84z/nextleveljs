<template>
  <div>
      <h1>My Posts</h1>
      <b-button @click="createPost">Create Post</b-button>
      <post-item
        v-for="post in posts"
        v-bind:post="post"
        :key="post.id"
        >

      </post-item>
  </div>
</template>

<script>
export default {
  methods: {
    createPost () {
      this.$router.push('/post/new')
    }
  },
  computed: {
    posts () {
      return this.$store.getters.getPostByCurrUser
    }
  }
}
</script>

<style lang="css" scoped>
</style>
