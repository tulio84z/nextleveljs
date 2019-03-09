export default {
    setUser(state, payload) {

        state.user = payload
        if (payload === null){
          state.joinedGroups = []
          return
        }
  
        if(typeof payload.groupsJoined !== "undefined") {
          state.joinedGroups = Object.keys(payload.groupsJoined)
        }
      },
      setJoinedGroups(state, payload) {
        state.joinedGroups = payload
      }
}