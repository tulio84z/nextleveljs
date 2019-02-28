<template>
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
        required
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
    <b-button type="submit" variant="primary" :disabled="!isMessageNotBlank">{{labelOk}}</b-button>
    <b-button variant="secondary" @click="onCancel">Cancel</b-button>
  </b-form>

</template>

<script>
export default {
  props: ['post'],
  data () {
    return {
      form: {
        title: this.post? this.post.title:'',
        url: this.post? this.post.url:'',
        message: this.post? this.post.message:'',
        groupId: this.post? this.post.groupId:'',
      },
      show: true,
    }
  },
  computed: {
    isMessageNotBlank () {
      return this.form.message !== '' && this.form.title !== '' && this.form.url
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
    },
    labelOk(){
      if(this.post){
        return 'Update'
      }
      return 'Submit'
    },
  },

  methods: {
    onSubmit (evt) {

      evt.preventDefault();
      
      const payload = {
        title: this.form.title,
        url: this.form.url,
        message: this.form.message,
        groupId: this.form.groupId
      }

      var action = 'createPost'
      if(this.post){
        var action = 'updatePost'
        payload.id = this.post.id
      }
      this.$store.dispatch(action, payload)
      this.$router.push('/')
    },
    onCancel () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
