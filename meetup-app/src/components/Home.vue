<template>
  <v-container>
    <v-layout row wrap class="mt-2 center">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" class="primary"> Explore Meetups </v-btn>
      </v-flex>

      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetup/new" class="primary"> Organize Meetups </v-btn>
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
      <v-flex xs12 sm6 class="text-xs-center">
        <p>Join our meetups</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      meetups: [
        { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV8aJFj8xS1koLcFV7XpWa0BzGYq2z4BBvaFQEfDHQ5HMR_7vj', id: 'New York Meetup', title: 'Meetup in New York'},
        { imageUrl: 'https://www.telegraph.co.uk/content/dam/Travel/hotels/europe/france/paris/paris-cityscape-overview-guide-xlarge.jpg', id: 'Paris Meetup', title: 'Meetup in Paris'}
      ],

    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push('/meetup/'+1)
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
