<template>
  <div>


    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <h1>All recent Posts</h1>
          <post-item
            v-for="post in posts"
            v-bind:post="post"
            :key="post.id"
            >

          </post-item>


        </b-col>
        <b-col>
          <h1>All recent Groups</h1>
          <group-item
            v-for="group in groups"
            v-bind:group="group"
            :key="group.id"
            >

          </group-item>

        </b-col>

      </b-row>
    </b-container>



  </div>

</template>

<script>
export default {

  computed:{
    posts () {
      return this.$store.getters.posts

    },
    groups() {
      return this.$store.getters.groups
    }
  },
  methods: {

  },

}
</script>
