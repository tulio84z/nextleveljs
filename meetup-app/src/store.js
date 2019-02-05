import Vue from "vue";
import Vuex from "vuex";
import meetup from './store/meetup'
import user from './store/user'
import shared from './store/shared'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    meetup: meetup,
    user: user,
    shared: shared
  }
})
