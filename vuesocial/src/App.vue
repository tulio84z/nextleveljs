<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand>
        <router-link to="/" tag="span" style="cursor: pointer">
          VueSocial
        </router-link>



      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="loggedIn">
          <b-nav-item>
            <router-link to="/create-post" tag="span" style="cursor: pointer">
              Create Post
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/create-group" tag="span" style="cursor: pointer">
              Create Group
            </router-link>

          </b-nav-item>
          <b-nav-item @click="onLogout">Logout</b-nav-item>

        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item>
            <router-link to="/login-user" tag="span" style="cursor: pointer">
              Login
            </router-link>

          </b-nav-item>
          <b-nav-item>
            <router-link to="/create-user" tag="span" style="cursor: pointer">
              Sign Up
            </router-link>
          </b-nav-item>
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
    methods : {
      onLogout () {
        this.loggedIn = false
      }
    }
  }
</script>
