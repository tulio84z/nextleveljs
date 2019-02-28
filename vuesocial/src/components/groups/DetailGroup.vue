<template>
  <div>
    <h1>{{group.name}}</h1>
    <h6>{{group.description}}</h6>
    <join-group-dialog
      v-bind:group="group"

    >
    </join-group-dialog>
    <div v-if="isOwner">
      <delete-group-dialog
        v-if="isOwner"
        v-bind:group="group"
        id='myModal'
      >
      </delete-group-dialog>
      <b-button 
        v-b-modal.myModal
        variant="danger"
      
      >Delete Group
      </b-button>
    </div>
    
    <div v-if="posts">
      <hr>
      <h3>Posts in This Group:</h3>
      <post-item
        v-for="post in posts"
        v-bind:post="post"
        :key="post.id"
        >

      </post-item>
    </div>

  </div>

</template>

<script>
export default {
  props: ['id'],

  computed: {
    user() {
      return this.$store.getters.user
    },
    group() {
      return this.$store.getters.getGroupById(this.id)
    },
    posts() {
      return this.$store.getters.getPostsByGroupId(this.id)
    },
    isOwner() {
      if (this.$store.getters.user){
        return this.$store.getters.user.id === this.group.creatorId
      }
    },
  },
}
</script>

<style lang="css" scoped>
</style>
