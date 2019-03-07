

export default {

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


}