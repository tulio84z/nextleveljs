<template>
  <b-card
    v-if="post !== null"
    class="post-item-card"
  >
    <b-row>
      <b-col md="8" style="padding-left: 0px;">

        <b-card-text
          class="post-item-title"
        >
          {{post.title}}
        </b-card-text>
        <br>
        <b-card-text
          class="post-item-message"
          @click="showArticle"
        >
          {{getPreviewOfMessage}}
        </b-card-text>
        <br>
        <b-card-text
          v-if="hasGroup"
        >
          <span class="post-item-published-text">Published in: </span>
          <b-link class="post-item-published-group-link"
            :to="'/group/id/' + group.id"

          >
            {{group.name}}
          </b-link>
        </b-card-text>
      </b-col>
      <b-col md="4">
        <b-card-img
          :src="post.url"
          height="90px"
        />
      </b-col>
    </b-row>
  </b-card>

</template>

<script>
export default {
  props:['post'],

  computed: {


    hasGroup() {
      return this.post.groupId !== null && this.post.groupId !== undefined
    },

    group() {

      if(this.hasGroup) {
        return this.$store.getters.getGroupById(this.post.groupId)
      }
    },
    getPreviewOfMessage() {
      return this.post.message.substring(0,50) + "..."
    },
  },
  methods: {
    showArticle() {
      this.$router.push('/post/id/' + this.post.id)
    }
  }
}
</script>
<style>
  .post-item-title {
    font-size: 20px;
    font-weight: bolder;

  }
  .post-item-message {
    font-size: 15px;
    color: grey;
  }
  .post-item-published-text {
    font-size: 15px;
  }
  .post-item-published-group-link{
    font-size: 15px;
    color: black;

  }
  .post-item-published-group-link:hover{
    color: black;
  }
  .post-item-card {
    max-height: 400px;
    max-width:600px;
    border: none;

  }
  .post-item-card:hover {
    border: solid;
    border-width: 1px;
    border-color: gainsboro;
    cursor: pointer;
  }
</style>
