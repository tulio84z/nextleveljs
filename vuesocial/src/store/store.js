import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase';
import router from '@/router'

Vue.use(Vuex)

function updateLocalUsersPosts(dbposts) {

  var dpPostsVals = dbposts.val()
  var posts = []
  Object.keys(dpPostsVals).forEach(function(key, index) {
    var entry = dpPostsVals[key]
    posts.push(entry)
  })

  const user = instantiateUser()
  user.id = posts[0].creatorId
  user.posts = posts

  return user
}

function instantiateUser() {

  const user = {
    id: '',
    posts: [],
    email: '',
    name: '',
    getPosts,
  }

  function getPosts(){
    return user.posts
  }
  return user
}

function getPostsPromiseFromDatabase(userId) {
  return firebase.database().ref('/posts/' + userId).once('value')
}

export default new Vuex.Store({

  state: {
    user: '',
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
  },
  actions: {

    fetchUserData({commit, getters}) {
      const user = getters.user
      getPostsPromiseFromDatabase(user.id)
        .then(data => {

          const updatedUser = updateLocalUsersPosts(data)

          commit('setUser', updatedUser)
        })
        .catch(error => {
          console.log(error)
        })
    },

    login({commit, getters}, payload) {

      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          const myUser = instantiateUser()
          myUser.id=data.user.uid
          myUser.email=payload.email
          myUser.name=payload.name


          return myUser
        })
        .then(user => {

          commit('setUser', user)

          return getPostsPromiseFromDatabase(user.id)

        })
        .then(data => {

          const updatedUser = updateLocalUsersPosts(data)

          commit('setUser', updatedUser)
        })
        .catch(error => {
          console.log(error)

        })
    },

    logout({commit}, payload) {

      commit('setUser', null)
    },

    signup({commit}, payload) {

      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {

          const newUser = instantiateUser()
          newUser.id=data.user.uid
          newUser.email=payload.email
          newUser.name=payload.name

          commit('setUser', newUser)
        })
        .catch(error => {
          console.log(error)
        })
    },

    autoSignIn ({commit}, payload) {
      const user = {
        id:payload.uid,
      }

      commit('setUser', user)


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
          return getPostsPromiseFromDatabase(user.id)
        })
        .then(data => {
          const updatedUser = updateLocalUsersPosts(data)

          commit('setUser', updatedUser)

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
  }
})
