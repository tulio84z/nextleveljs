import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    user: null,
    registeredUsers: [],
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
    ],
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    registerUser(state, payload) {

      state.registeredUsers.push(payload)
    }
  },
  actions: {
    login({commit}, payload) {
      const myUser = {
        id: 'fakeId',
      }
      commit('setUser', myUser)
    },
    logout({commit}, payload) {

      commit('setUser', null)
    },
    signup({commit}, payload) {
      var uuid = Math.random().toString(36).substr(2,5)
      const newUser = {
        id: uuid,
        email: payload.email,
        name: payload.name,
        password: payload.password
      }
      commit('registerUser', newUser)
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
