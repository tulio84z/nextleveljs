import state from './state'
import getters from './getters'

export default {
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
        const userPosts = []
        try{
          getters.posts.map(function(entry) {
            if(entry.creatorId === getters.user.id) {
              userPosts.push(entry)
            }
          })
        }catch(err){
          console.log(err)
        }
        return userPosts
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
          const groupPosts = []
          try{
            
            getters.posts.map(function(entry){
                if(entry.groupId === groupId){
                  groupPosts.push(entry)
                }
            })
          }catch(err){
            console.log(err)
          }
          return groupPosts
        }
      },
}