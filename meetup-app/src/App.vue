<template>

  <v-app>

    <v-navigation-drawer fixed v-model="sideNav">
      <v-list>
        <v-list-title v-for="item in menuItems" :key="item.title">
          <v-list-title-action>
            <v-icon> {{ item.icon }}</v-icon>
          </v-list-title-action>
          <v-list-title-content>
            {{ item.title }}
          </v-list-title-content>
        </v-list-title>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark class="purple darken-1">
      <v-toolbar-side-icon
        @click.native.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"


        ></v-toolbar-side-icon>
      <v-toolbar-title>DevMeetup</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">


        <v-btn flat v-for="item in menuItems" :key="item.title">
          <v-icon left dark> {{ item.icon }} </v-icon>

          {{ item.title }}



        </v-btn>



      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet">
  </v-app>

</template>

<script>
  export default {
    data() {
      return {
        sideNav: false,
        menuItems: [
            { icon: 'supervisor_account', title: 'View Meetups'},
            { icon: 'room', title: 'Organize Meetups'},
            { icon: 'person', title: 'Profile'},
            { icon: 'face', title: 'Sign Up'},
            { icon: 'lock_open', title: 'Sign In'},
        ]
      }
    }
  }
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
