<template>
  <div>

    <h1>All Posts</h1>
    <h6>Welcome to the Posts Page!</h6>
      <button 
        class="vuesocial-info-btn"
        name="createPost"
        variant="info" 
        @click="createPost"
        >
          Create Post
      </button>

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

.vuesocial-info-btn{
  color: #fff;
    background-color: #17a2b8;
    border-color: #17a2b8;
    border-radius: .25rem;
}

</style>
