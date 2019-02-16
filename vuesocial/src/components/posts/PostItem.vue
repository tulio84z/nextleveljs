<template>
  <b-card :title=post.title
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">

      <p>
        {{post.message}}
      </p>
      
    <br>
    <br>
    <b-button href="#" variant="primary">Go to Article</b-button>
    <b-button href="#" variant="secondary">Delete Post</b-button>
  </b-card>
</template>

<script>
export default {
  props:['post'],
  data () {
    return {
      message: 'hi'
    }
  }
}
</script>

<style lang="css" scoped>
</style>
