<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6>
        <h1>Create a new Meetup</h1>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-text-field
            name="title"
            label="Title"
            id="title"
            v-model="title"
            required
          >
          </v-text-field>
          <v-text-field
            name="location"
            label="Location"
            id="location"
            v-model="location"
            required
          >
          </v-text-field>
          <v-btn raised class="primary" @click="onPickFile"> Uploade Image</v-btn>
          <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="image/*"
            @change="onFilePicked">
          <v-layout row>
            <v-flex>
              <img :src="imageUrl" height="200px">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="description"
                required
              >
              </v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <h4>Choose a date and time</h4>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex>
              <v-date-picker v-model="date"></v-date-picker>
              <p>{{date}}</p>
            </v-flex>
            <v-flex>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
              <p>{{time}}</p>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <v-btn class="primary" :disabled="!formIsValid" type="submit">
                Create Meetup</v-btn>
              {{ submittableDateTime }}


            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: new Date().toISOString().substr(0, 10),
      time: new Date(),
      image: null
    }
  },
  computed: {
    formIsValid() {
      return this.title !== '' &&
          this.location !== '' &&
         this.imageUrl !== '' &&
         this.description !== ''
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if(typeof this.time ==='string'){
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
      }else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
    }
  },
  methods: {
    onCreateMeetup: function() {

      if (!this.formIsValid) {
        return
      }
      if (!this.image) {
        return
      }

      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime,
      }

      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files

      let filename = files[0].name

      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },
  }
}
</script>
