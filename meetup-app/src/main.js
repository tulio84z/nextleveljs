import '@babel/polyfill'
import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import firebase from 'firebase';
import router from "./router";
import {store} from "./store";
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyAj1Vl7mTxaXDVG8dZNvJTouZi_bFspZaA",
      authDomain: "mymeetupproject.firebaseapp.com",
      databaseURL: "https://mymeetupproject.firebaseio.com",
      projectId: "mymeetupproject",
      storageBucket: "mymeetupproject.appspot.com",
      messagingSenderId: "134188105797",
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app');
