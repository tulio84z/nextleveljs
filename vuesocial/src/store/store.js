import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    user: null,
    posts: [
      {
        message: 'this is the first post',
        group: 'groupId-1',
        user: 'user1'
      },
      {
        message: 'this is the second post',
        group: null,
        user: 'user1'
      },

    ],
    groups: [
      {},
    ]
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
    posts (state) {
      return state.posts
    },
    groups (state) {
      return state.groups
    },
  }
})
