<template>

  <div id="app">

    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse">
      </b-navbar-toggle>

      <b-navbar-brand>
        <router-link to="/" tag="span" style="cursor: pointer">
          VueSocial
        </router-link>
        <router-link to="/user" tag="span" style="cursor: pointer" v-if="userIsAuthenticated">
          Hello, {{user.name}}
        </router-link>
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="userIsAuthenticated">
          <b-nav-item>
            <router-link to="/posts" tag="span" style="cursor: pointer">
              Posts
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/groups" tag="span" style="cursor: pointer">
              Groups
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
    <b-container>
      <router-view></router-view>
      <!-- <main-background></main-background> -->
    </b-container>

  </div>

</template>

<script>
  export default {

    computed: {
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      user (){
        return this.$store.getters.user
      },
    },
    methods : {
      onLogout () {
        this.$store.dispatch('logout')
      }
    },
  }
</script>
