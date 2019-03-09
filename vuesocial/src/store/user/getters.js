export default {
    user(state) {
        try{
          return state.user[Object.keys(state.user)[0]]
        }catch(err){
          console.log('Error while getting user: ' + err)
          return null
        }
      },
      getUserById(state, getters) {
        try{
          return (userId) => {
            return getters.user
          }
          
        }catch(err){
          console.log('An error happend while getting user by id: ' + err)
        }
      },
      joinedGroups(state){
        return state.joinedGroups
      }
}