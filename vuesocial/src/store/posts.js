import * as firebase from 'firebase';
import router from '@/router'

export default {
  state: {
    posts: [],
  },
  mutations: {
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
        })
        .catch(error => {
          console.log(error)
        })
    },
    updatePost({commit, getters}, payload){
      console.log('updatePost')
      console.log(payload)

      const updateObj = {
        message: payload.message,
        title: payload.title,
        url: payload.url,
        groupId: payload.groupId
      }

      firebase.database().ref('posts/').child(payload.id).update(updateObj)
        .then(data => {
          console.log("Post Updated Sucessfully")
          return firebase.database().ref('/posts/').once('value')

        })
        .then(data => {
          const updatedPosts = data.val()
          commit('setPosts', updatedPosts)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
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
    },
    getPostByCurrUser(state, getters) {
      try{
        if(getters.user === null){
          return
        }
        const userPosts = []

        getters.posts.map(function(entry) {
          if(entry.creatorId === getters.user.id) {
            userPosts.push(entry)
          }
        })

        return userPosts
      }catch(err){
        console.log(err)

      }
    },
    getPostsByUser(state, getters){
      return (userId) => {
        try{
          const userPosts = []
          getters.posts.map(function(entry){
            if(entry.creatorId === userId){
              userPosts.push(entry)
            }
          })
          return userPosts
        }catch(error){
          console.log('error while trying to get posts by user: ' + error)
        }
      }
    },
    getPostsByGroupId(state, getters) {
      return (groupId) => {
        try{
          const groupPosts = []
          getters.posts.map(function(entry){
              if(entry.groupId === groupId){
                groupPosts.push(entry)
              }
          })
          return groupPosts

        }catch(err){
          console.log(err)
        }
      }
    },
  }
}
