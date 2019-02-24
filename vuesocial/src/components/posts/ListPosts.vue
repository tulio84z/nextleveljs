<template>
  <div>
    <span>All Posts</span>
      <br>
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
