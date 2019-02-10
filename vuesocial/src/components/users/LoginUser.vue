<template>
  <div>
    <h1>Login Page</h1>

    <b-button @click="onLogin">Login</b-button>
  </div>

</template>

<script>
export default {
  methods : {
    onLogin () {
      this.$store.dispatch('login')
    }
  }
}
</script>
