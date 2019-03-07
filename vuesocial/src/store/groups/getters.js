import state from './state'


export default{
    groups(state) {
        return state.groups
      },
  
    getGroupById(state, getters) {
        return (groupId) => {
            try {
            return getters.groups.find(n => n.id === groupId)  
            } catch (error) {
            console.log(error)
            return null 
            }
        }
    },
    getGroupByCurrUser(state, getters) {
        const userGroups = []
        try {
            getters.groups.map(function(entry) {
            if(entry.creatorId === getters.user.id) {
                userGroups.push(entry)
            }
            })
        } catch (error) {
            console.log(error)
        }
        return userGroups
    },
    getPostsInGroup(state, getters) { 
        return (groupId) => {
            try{
            var count = 0
            const posts = getters.posts

            for (var i = 0; i < posts.length; i++){
                if (posts[i].groupId === groupId){
                    count++
                }
            }
            return count
            }catch(err){
            return 0
            }
        } 
    },
    getUsersJoinedQtdInGroup(state, getters) {
        return (groupId) => {
            try {
            return getters.getGroupById(groupId).userIds.length - 1

            } catch (error) {
            return 0
            }
        }
    },
}