import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase';
import router from '@/router'

Vue.use(Vuex)


export default new Vuex.Store({

  state: {
    user: '',
    posts: [],
    groups: []
  },

  mutations: {
    setUser(state, payload) {

      state.user = payload
    },
    setPosts(state, payload) {

      if (payload === null) {
        state.posts = null
        return
      }
      const posts = Object.keys(payload).map(function(key) {

        payload[key].id = key
        return payload[key]
      })

      state.posts = posts
    },

    setGroups(state, payload) {
      if (payload === null) {
        state.groups = null
        return
      }
      const groups = Object.keys(payload).map(function(key) {

        payload[key].id = key
        return payload[key]
      })

      state.groups = groups
    },
  },
  actions: {
    fetchPosts({commit}) {
      console.log('fetching Post')
      firebase.database().ref('/posts/').once('value')
      .then(data => {

        const updatedPosts = data.val()

        commit('setPosts', updatedPosts)
      })
      .catch(error => {
        console.log(error)

      })
    },

    fetchGroups({commit}) {
      console.log('fetching Groups')
      firebase.database().ref('/groups/').once('value')
      .then(data => {

        const updatedGroups = data.val()

        commit('setGroups', updatedGroups)
      })
      .catch(error => {
        console.log(error)

      })
    },

    fetchUserData({dispatch, commit}) {
      console.log('Fetching User Data!')

      dispatch('fetchPosts')
      dispatch('fetchGroups')
    },


    deletePost({dispatch, commit}, payload) {
      console.log('Deleting')
      console.log(payload.id)
      firebase.database().ref('/posts').child(payload.id).remove()
        .then(data => {
          console.log('Removed sucessfully')

        })
        .catch(error => {
          console.log(error)
        })
        dispatch('fetchUserData')
    },



    login({dispatch, commit, getters}, payload) {
      console.log('logging in')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(data => {

          return firebase.database().ref('/users/' + data.user.uid).once('value')

        })
        .then(user => {

          commit('setUser', user.val())

        })
        .catch(error => {
          console.log(error)
        })
        dispatch('fetchUserData')
    },

    logout({commit}, payload) {

      commit('setUser', null)
      commit('setPosts', null)
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

    autoSignIn ({dispatch, commit}, payload) {
      console.log('autoSignIn')

      firebase.database().ref('/users/' + payload.uid).once('value')
      .then(user => {

        commit('setUser', user.val())

      })
      .catch(error => {
        console.log(error)
      })

      dispatch('fetchUserData')
    },
    createPost({commit, getters}, payload) {
      console.log('createPost')
      console.log(payload)

      const user = getters.user

      const post = {
        message: payload.message,
        title: payload.title,
        url: payload.url,
        creatorId: user.id,
        groupId: payload.groupId
      }

      firebase.database().ref('posts/').push(post)
        .then(data => {

          return firebase.database().ref('/posts/').once('value')
        })
        .then(data => {

          const updatedPosts = data.val()

          commit('setPosts', updatedPosts)

          router.push('/')
        })
        .catch(error => {
          console.log(error)
        })
    },
    createGroup({commit, getters}, payload) {

      const user = getters.user

      const group = {
        name: payload.name,
        description: payload.description,
        creatorId: user.id
      }

      firebase.database().ref('groups/').push(group)
        .then(data => {

          return firebase.database().ref('/groups/').once('value')
        })
        .then(data => {

          const updatedGroups = data.val()

          commit('setGroups', updatedGroups)

          router.push('/groups')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },


  getters: {


    groups(state) {
      return state.groups
    }
    ,
    user(state) {

      if (state.user !== null && state.user !== undefined){
          return state.user[Object.keys(state.user)[0]]
      }
      return null

    },

    getPostByCurrUser(state, getters) {
      console.log('getPostByCurrUser')

      const userPosts = []

      getters.posts.map(function(entry) {
        if(entry.creatorId === getters.user.id) {
          userPosts.push(entry)
        }
      })


      return userPosts
    },


    posts(state) {
      return state.posts
    },

    getPostById(state, getters) {

      return (postId) => {
        if (getters.posts !== null && getters.posts !== undefined) {
            return getters.posts.find(n => n.id === postId)
        }
        return null

      }
    },
    getPostIds(state, getters) {
      if (getters.posts !== null && getters.posts !== undefined) {
          return getters.posts.map(function(entry) {return entry.id})
      }
      return null
    }
  }
})
