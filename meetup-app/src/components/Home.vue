<template>
  <v-container>
    <v-layout row wrap class="mt-2 center">
      <v-flex xs12 sm6 class="text-xs-center text-sm-center">
        <v-btn large router to="/meetups" class="primary"> Explore Meetups </v-btn>
      </v-flex>

      <v-flex xs12 sm6 class="text-xs-center text-sm-center">
        <v-btn large router to="/meetup/new" class="primary"> Organize Meetups </v-btn>
      </v-flex>

    </v-layout>
    <v-layout>
      <v-flex>
        <v-progress-circular
          indeterminate
          color="primary"
          v-if="loading"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            @click="onLoadMeetup(meetup.id)"
          >

          <div class="title">
            {{ meetup.title }}
          </div>


        </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our meetups</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    meetups () {
      return this.$store.getters.featuredMeetups
    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push('/meetup/'+id)
    }
  }
}
</script>
<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0);
    color: white;
    font-size: 2em;
  }
</style>
