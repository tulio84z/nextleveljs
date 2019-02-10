import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
  },
  actions: {
    login({commit}, payload) {
      const newUser = {
        id: 'fakeId',
      }
      commit('setUser', newUser)
    },
    logout({commit}, payload) {

      commit('setUser', null)
    },
  },
  getters: {
    user (state) {
      return state.user
    },
  }
})
