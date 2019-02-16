<template>
  <div>
    <h1>Share your technical articles</h1>

    <post-item
      v-for="postid in postIds"
      v-bind:postId="postid"
      :key="postid"
      >

    </post-item>
  </div>

</template>

<script>
export default {

  computed:{
    postIds () {
      return this.$store.getters.getPostIds

    }
  },
  methods: {

  },

}
</script>
