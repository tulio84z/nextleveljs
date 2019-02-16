<template>
  <div>
    <h1>Share your technical articles</h1>
    <post-item
      v-for="(post, index) in posts"
      v-bind:post="post"
      :key="index"
      >
    </post-item>
  </div>

</template>

<script>
export default {
  data () {
    return {
      items: [1,2,3]
    }
  },
  computed:{
    posts () {
      if (this.$store.getters.user){
        return this.$store.getters.posts
      }
      return []
    }
  },
  methods: {

  },

}
</script>
