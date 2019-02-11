import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase';
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    user: null,

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

    fetchUserData({commit, getters}) {
      const user = getters.user
      firebase.database().ref('/posts/' + user.id).once('value')
        .then(data => {

          const retrievedData= data.val()

          var userPostData = []
          Object.entries(retrievedData).forEach(entry => {
            let value = entry[1];
            userPostData.push(value)
          })

          console.log(userPostData)

          const updatedUser = {
            id: user.id,
            posts: [],

          }
          commit('setUser', updatedUser)
        })
        .catch(error => {
          console.log(error)
        })
    },

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

      commit('setUser', {
        id:payload.uid,
      })
    },
    createPost({commit, getters}, payload) {

      const user = getters.user
      const post = {
        message: payload.message,
        creatorId: user.id
      }

      firebase.database().ref('posts/' + user.id).push(post)
        .then(data => {
          console.log(data)
          router.push('/')
        })
        .catch(error => {
          console.log(error)
        })
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
