export default {
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
}