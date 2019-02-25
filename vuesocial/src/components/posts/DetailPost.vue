<template>
  <div class="">
    <b-card
      overlay
      :title="post.title"
      :img-src="post.url"
      img-alt="Image"
      img-top
      tag="article"
      text-variant="white"
    >
    </b-card>
    <div class="article-detail-card">
      <span>{{post.message}}</span>
    </div>
    <br>
    <p>
      <delete-post-item-dialog
        v-if="isOwner"
        v-bind:post="post"

      >
      </delete-post-item-dialog>
      <edit-post-item-dialog
        v-if="isOwner"
        v-bind:post="post"
      >
      </edit-post-item-dialog>
    </p>


    <br>

  </div>

</template>

<script>
export default {
  props: ['id'],

  computed: {
    post() {

      return this.$store.getters.getPostById(this.id)
    },
    isOwner() {
      if (this.$store.getters.user){
        return this.$store.getters.user.id === this.post.creatorId
      }
    },
  }
}
</script>

<style>
  .article-detail-card{
    border: solid;
    border-width: 1px;
    border-color: gainsboro;
  }
</style>
