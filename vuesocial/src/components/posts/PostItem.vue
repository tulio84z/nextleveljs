<template>
  <b-card
    v-if="post !== null"
    :title=post.title
    :img-src="post.url"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2">
      <p>
        {{post.message}}
      </p>
      <img src="post.url" alt="">
    <br>
    <br>

    <b-button
      :to="'/post/' + postId"
      variant="primary"
      >
      Go to Article
    </b-button>
    <delete-post-item-dialog
      v-bind:postId="postId"

    >
    </delete-post-item-dialog>
  </b-card>
</template>

<script>
export default {
  props:['postId'],

  computed: {
    post() {
      return this.$store.getters.getPostById(this.postId)
    }
  }
}
</script>
