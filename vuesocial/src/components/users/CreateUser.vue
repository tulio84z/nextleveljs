<template>
  <div>
    <h1>Create User Page</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="exampleInputGroup1"
                        label="Email address:"
                        label-for="exampleInput1"
                        description="We'll never share your email with anyone else.">
            <b-form-input id="exampleInput1"
                          type="email"
                          v-model="form.email"
                          required
                          placeholder="Enter email">
            </b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup2"
                        label="Your Name:"
                        label-for="exampleInput2">
            <b-form-input id="exampleInput2"
                          type="text"
                          v-model="form.name"
                          required
                          placeholder="Enter name">
            </b-form-input>
          </b-form-group>

          <b-form-group id="exampleInputGroup3"
                        label="Create Password:"
                        label-for="exampleInput3">
            <b-form-input id="exampleInput3"
                          type="password"
                          v-model="form.pwd"
                          required
                          placeholder="Enter a password">
            </b-form-input>
          </b-form-group>

          <b-form-group id="exampleInputGroup4"
                        label="Repeat Password:"
                        label-for="exampleInput4">
            <b-form-input id="exampleInput4"
                          type="password"
                          v-model="form.repeatpwd"
                          required
                          aria-describedby="inputRepeatPwdCheck"
                          :state="isRepeatedPwdOk"
                          placeholder="Repeat password">
            </b-form-input>
            <b-form-invalid-feedback id="inputRepeatPwdCheck">
              <!-- This will only be shown if the preceeding input has an invalid state -->
              Passwords do not match!
            </b-form-invalid-feedback>
          </b-form-group>

          <b-button type="submit" variant="primary" :disabled="!formIsValid">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
  </div>

</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        pwd: '',
        repeatpwd: '',
      },
      show: true,

    }
  },
  computed : {
    isRepeatedPwdOk () {
      return this.form.pwd === this.form.repeatpwd
    },
    formIsValid () {
      return this.form.email !== '' &&
          this.form.name !== '' &&
         this.form.pwd !== '' &&
         this.isRepeatedPwdOk
    },
    user() {
      return this.$store.getters.user
    },
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      //alert(JSON.stringify(this.form));
      this.$store.dispatch('signup', {email: this.form.email, password: this.form.pwd, name: this.form.name})
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.name = '';
      this.form.pwd = '';
      this.form.repeatpwd = '';
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
}
</script>
