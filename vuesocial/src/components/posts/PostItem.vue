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
      <p v-if="hasGroup">
        Published in: {{group.name}}
      </p>
      <img src="post.url" alt="">
    <br>
    <br>

    <b-button
      :to="'/post/id/' + post.id"
      variant="primary"
      >
      Go to Article
    </b-button>
    <delete-post-item-dialog
      v-if="isOwner"
      v-bind:post="post"

    >
    </delete-post-item-dialog>
  </b-card>
</template>

<script>
export default {
  props:['post'],

  computed: {

    isOwner() {
      return this.$store.getters.user.id === this.post.creatorId
    },
    hasGroup() {
      return this.post.groupId !== null && this.post.groupId !== undefined
    },

    group() {

      if(this.hasGroup) {
        return this.$store.getters.getGroupById(this.post.groupId)
      }
    }
  }
}
</script>
