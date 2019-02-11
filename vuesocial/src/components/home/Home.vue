<template>
  <div>
    <h1>This it the Social App</h1>
    <ol>
      <post-item
        v-for="(post, index) in posts"
        v-bind:post="post"
        :key="index"
        >
      </post-item>
    </ol>
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
        return this.$store.getters.user.posts
      }
      return []
    }
  },
  methods: {

  },

}
</script>
