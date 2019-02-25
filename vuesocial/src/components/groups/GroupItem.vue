<template>
  <b-card
    class="group-item-card"
    v-if="group !== null"
    :title=group.title
    @click=showGroup
  >
    <b-row>
      <b-col md="12" style="padding-left: 0px;">

        <b-card-text class="group-item-title">
          {{group.name}}
        </b-card-text>
        <br>
        <b-card-text
          class="group-item-message"
        >
          {{group.description}}
        </b-card-text>
        <br>
        <b-card-text
        >
          <span class="group-item-posts">Posts: {{postsInGroup}}</span>
          <br>
          <span class="group-item-users">Users: {{usersInGroup}}</span>

        </b-card-text>
      </b-col>
    </b-row>
    <br>
  </b-card>
</template>

<script>
export default {
  props:['group'],
  computed: {
    postsInGroup (){
      return this.$store.getters.getPostsInGroup(this.group.id)
    },
    usersInGroup(){
      return this.$store.getters.getUsersJoinedQtdInGroup(this.group.id)
    }
  },
  methods: {
    showGroup() {
      this.$router.push('/group/id/' + this.group.id)
    }
  }
}
</script>
<style>
  .group-item-title {
    font-size: 20px;
    font-weight: bolder;

  }
  .group-item-message {
    font-size: 15px;
    color: grey;
  }
  .group-item-posts {
    font-size: 15px;
  }
  .group-item-users {
    font-size: 15px;
  }
  .group-item-published-group-link{
    font-size: 15px;
    color: black;

  }
  .group-item-published-group-link:hover{
    color: black;
  }
  .group-item-card {
    max-height: 400px;
    max-width:600px;
    border: none;

  }
  .group-item-card:hover {
    border: solid;
    border-width: 1px;
    border-color: gainsboro;
    cursor: pointer;
  }
</style>
