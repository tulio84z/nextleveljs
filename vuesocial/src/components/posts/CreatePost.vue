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
      <b-form-textarea id="textarea1"
                   placeholder="Enter something"
                   :rows="3"
                   v-model="form.message"
                   :max-rows="6">
      </b-form-textarea>
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
      },
      show: true,
    }
  },
  computed: {
    isMessageNotBlank () {
      return this.form.message !== '' && this.form.title !== ''
    }
  },

  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      //alert(JSON.stringify(this.form));
      this.$store.dispatch('createPost', {title: this.form.title, url: this.form.url, message: this.form.message, })
    },
    onCancel () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
