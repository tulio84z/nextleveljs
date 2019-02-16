import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase';
import router from '@/router'

Vue.use(Vuex)


function convertDbPostsToLocalPosts(dbposts) {
  console.log('convertDbPostsToLocalPosts')

  const dbVals = dbposts.val()

  return dbVals
}

function getPostsPromiseFromDatabase(userId) {
  return firebase.database().ref('/posts/').once('value')
}

export default new Vuex.Store({

  state: {
    user: '',
    posts: [],
  },

  mutations: {
    setUser(state, payload) {

      state.user = payload
    },
    setPosts(state, payload) {
      state.posts = payload
    }
  },
  actions: {

    fetchUserData({commit, getters}) {
      console.log('Fetching User Data!')
      const user = getters.user

      commit('setUser', user)

    },

    login({commit, getters}, payload) {
      console.log('logging in')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(data => {

          return firebase.database().ref('/users/' + data.user.uid).once('value')

        })
        .then(user => {

          commit('setUser', user.val())
          return firebase.database().ref('/posts/').once('value')

        })
        .then(data => {

          const updatedPosts = convertDbPostsToLocalPosts(data)

          commit('setPosts', updatedPosts)
        })
        .catch(error => {
          console.log(error)

        })
    },

    logout({commit}, payload) {

      commit('setUser', null)
    },

    signup({commit}, payload) {
      console.log('Signing Up')

      const newUser = {
        id: '',
        email: payload.email,
        name: payload.name,
      }
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          newUser.id = user.user.uid

          return firebase.database().ref('users/' + newUser.id).push(newUser)

        })
        .then(data => {
          commit('setUser', newUser)
        })
        .catch(error => {
          console.log(error)
        })
    },

    autoSignIn ({commit, getters}, payload) {
      console.log('autoSignIn')

      firebase.database().ref('/users/' + payload.uid).once('value')
      .then(user => {

        commit('setUser', user.val())
        return firebase.database().ref('/posts/').once('value')

      })
      .then(data => {

        const updatedPosts = convertDbPostsToLocalPosts(data)

        commit('setPosts', updatedPosts)
      })
      .catch(error => {
        console.log(error)

      })

    },
    createPost({commit, getters}, payload) {

      const user = getters.user

      const post = {
        message: payload.message,
        title: payload.title,
        url: payload.url,
        creatorId: user.id
      }

      firebase.database().ref('posts/').push(post)
        .then(data => {

          console.log(data)
          return getPostsPromiseFromDatabase(user.id)
        })
        .then(data => {

          const updatedPosts = convertDbPostsToLocalPosts(data)

          commit('setPosts', updatedPosts)

          router.push('/')
        })
        .catch(error => {
          console.log(error)
        })
    },
  },

  getters: {
    user (state) {

      if (state.user !== null && state.user !== undefined){
          return state.user[Object.keys(state.user)[0]]
      }
      return null

    },
    posts(state) {
      return state.posts
    },
  }
})
