<template>
  <div>

    <h1>All Posts</h1>
    <h6>Welcome to the Posts Page!</h6>
      <b-button variant="info" @click="createPost">Create Post</b-button>
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
      return this.$store.getters.posts
    }
  }
}
</script>

<style lang="css" scoped>
</style>
