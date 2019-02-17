<template>
  <div>

  <h1>Create a new group!</h1>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="exampleInputGroup1"
        label="Name:"
        label-for="exampleInput1"
        description="Provide a name for your group"
      >
        <b-form-input
          id="exampleInput1"
          type="text"
          v-model="form.name"
          required
          placeholder="Enter group name" />
      </b-form-group>


      <b-form-group
        id="exampleInputGroup2"
        label="Description:"
        label-for="textarea1"
        description="Provide a description for your group"
      >
        <b-form-textarea
          id="textarea1"
          v-model="form.description"
          placeholder="Enter a description for your group"
          rows="3"
          max-rows="6"/>
      </b-form-group>


      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          description: '',
        },
        show: true
      }
    },
    
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        //alert(JSON.stringify(this.form))
        this.$store.dispatch('createGroup', {name: this.form.name, description: this.form.description})
      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.name = ''
        this.form.description = ''
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>
