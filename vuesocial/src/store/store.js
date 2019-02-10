import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase';

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

      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const myUser = {
            id: user.uid,
            email: payload.email,
            name: payload.name,
          }
          commit('setUser', myUser)
        })
        .catch(error => {
          console.log(error)
        })

      var user = this.state.registeredUsers.find(n => n.email === payload.email)
      if(user !== null || user !== undefined) {
        commit('setUser', user)
        return
      } else {
        console.log('An error has happened')
      }
    },
    logout({commit}, payload) {

      commit('setUser', null)
    },
    signup({commit}, payload) {

      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            email: payload.email,
            name: payload.name,
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          console.log(error)
        })
    },
    autoSignIn ({commit}, payload) {
      console.log(payload)
      // commit('setUser', {
      //   id:payload.uid,
      // })
    },
  },


  getters: {
    user (state) {
      return state.user
    },
    registeredUsers (state) {
      return state.registeredUsers
    },
    posts (state) {
      return state.posts
    },
    groups (state) {
      return state.groups
    },
  }
})
