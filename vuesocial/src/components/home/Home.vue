<template>
  <div>
    <h1>Share your technical articles</h1>

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

  computed:{
    posts () {
      return this.$store.getters.posts

    }
  },
  methods: {

  },

}
</script>
