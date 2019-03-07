import * as firebase from 'firebase';

export default {
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
}