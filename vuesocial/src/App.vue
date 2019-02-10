<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">VueSocial</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="loggedIn">
          <b-nav-item href="#">Create Post</b-nav-item>

          <!-- <router-link to="/" tag="span" style="cursor: pointer">
            DevMeetup
          </router-link> -->




          <b-nav-item href="#">Create Group</b-nav-item>
          <b-nav-item href="#">Logout</b-nav-item>

        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item href="#">Login</b-nav-item>
          <b-nav-item href="#">Sign Up</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data () {
      return {

        loggedIn: true
      }
    },
  }
</script>
