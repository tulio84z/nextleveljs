<template>
  <div class="">
    <h1>Create Post Page</h1>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-input
          id="exampleInput2"
          type="text"
          v-model="form.title"
          required
          placeholder="Enter Title" />
      <br>
      <b-form-input
          id="exampleInput3"
          type="text"
          v-model="form.url"
          placeholder="Enter Image Url" />
      <br>
      <img
        v-if="hasUrl"
        :src="form.url"
        height="200px"
        width="200px">
      <b-form-textarea id="textarea1"
                   placeholder="Enter something"
                   :rows="3"
                   v-model="form.message"
                   :max-rows="6">
      </b-form-textarea>

      <b-form-group id="exampleInputGroup3" label="Group:" label-for="groupsSelector">
        <b-form-select id="groupsSelector" :options="groups" v-model="form.groupId" />
      </b-form-group>
      <b-button type="submit" variant="primary" :disabled="!isMessageNotBlank">Submit</b-button>
      <b-button variant="secondary" @click="onCancel">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        title: '',
        url: '',
        message: '',
        groupId: null,
      },
      show: true,
    }
  },
  computed: {
    isMessageNotBlank () {
      return this.form.message !== '' && this.form.title !== ''
    },
    hasUrl () {
      return this.form.url !== '' && this.form.url !== null && this.form.url !== undefined
    },
    groups() {
      const selectableGroups = [{'value':'', 'text':'Select a group name'}]

      if (this.$store.getters.groups !== null) {
        this.$store.getters.groups.map(function(entry){
          selectableGroups.push({'value':entry.id, 'text':entry.name})
        })
      }
      return selectableGroups
    }
  },

  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      //alert(JSON.stringify(this.form));
      this.$store.dispatch('createPost', {title: this.form.title, url: this.form.url, message: this.form.message, groupId: this.form.groupId})
    },
    onCancel () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
