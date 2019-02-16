import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/css/master.css'
import firebase from 'firebase';
import PostItem from '@/components/posts/PostItem.vue'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.component('post-item', PostItem)

new Vue({
  router,
  store,
  render: function (h) { return h(App) },
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyDr76PmEhjXogUgT9_EuImbCoOJY2DsID8",
      authDomain: "myvuesocial.firebaseapp.com",
      databaseURL: "https://myvuesocial.firebaseio.com",
      projectId: "myvuesocial",
      storageBucket: "myvuesocial.appspot.com",
      messagingSenderId: "569664720915"
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('OnAuthStateChanged')
        this.$store.dispatch('autoSignIn', user)
        //this.$store.dispatch('fetchUserData')
      }
    })
  }
}).$mount('#app')
