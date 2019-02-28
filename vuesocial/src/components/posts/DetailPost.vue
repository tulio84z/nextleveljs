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
    <div
      v-if="isOwner"
    >
    <p>
      <delete-post-item-dialog
        v-if="isOwner"
        v-bind:post="post"
        id='myModal'
      >
      </delete-post-item-dialog>
      <b-button 
        v-b-modal.myModal
        variant="danger"
        
      >Delete Post
      </b-button>
      <b-button
        v-if="isOwner"
        variant="warning"
        @click="edit"
      >
        Edit Post
      </b-button>

    </p>


    <br>
    </div>


  </div>

</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      show: false
    }
  },
  computed: {
    post() {

      return this.$store.getters.getPostById(this.id)
    },
    isOwner() {
      if (this.$store.getters.user){
        return this.$store.getters.user.id === this.post.creatorId
      }
    },
  },
  methods: {
    edit() {
      this.$router.push('/post/update/' + this.post.id)
    },
    showModal() {
      this.show = true
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
