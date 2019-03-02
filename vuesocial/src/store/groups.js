import * as firebase from 'firebase';
import router from '@/router'

export default {
  state: {
    groups: [],
  },
  mutations: {
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

    deleteGroup({commit, getters, dispatch}, payload){
      console.log(('deleteGroup action called'))

      firebase.database().ref('/groups/' + payload.id).once('value')
        .then(data=> {
          const dbGroup = data

          var promises = []
          dbGroup.val().userIds.map(function(entry){
            if(entry !== 'default'){
              promises.push(
                dispatch('leaveGroup', {groupId: dbGroup.key, id: entry})
              )
            }
          })
          return Promise.all(promises)
        })
        .then(() => {
          return firebase.database().ref('/groups/').child(payload.id).remove()    
        })
        .then(() => {
          return firebase.database().ref('/posts/').once('value')
        })
        .then(data => {
          const updatedPosts = data.val()
          var idx = Object.keys(updatedPosts)
          var promises = []
          for(var i = 0; i < idx.length; i++) {
            if (updatedPosts[idx[i]].groupId === payload.id){
              updatedPosts[idx[i]].groupId = ''

              promises.push(
                firebase.database().ref('posts/').child(idx[i]).update(updatedPosts[idx[i]])
              )
            }
          }
          return Promise.all(promises)
        })
        .then(data => {
          console.log('Sucessfully deleted group!')
          dispatch('fetchUserData', getters.user.id)
        })
        .catch(error => {
          console.log('Error while trying to remove group:' + error)
        })
    },

    fetchGroups({commit}) {

      firebase.database().ref('/groups/').once('value')
      .then(data => {

        const updatedGroups = data.val()

        commit('setGroups', updatedGroups)
      })
      .catch(error => {
        console.log(error)

      })
    },
    createGroup({commit, getters, dispatch}, payload) {

      const user = getters.user

      const group = {
        name: payload.name,
        description: payload.description,
        creatorId: user.id,
        userIds: ['default']
      }

      firebase.database().ref('groups/').push(group)
        .then(data => {
          
          return dispatch('joinGroup', {groupId: data.key})
          
        })
        .then(data => {
          return firebase.database().ref('/groups/').once('value')
        }).then(data => {
          const updatedGroups = data.val()
          commit('setGroups', updatedGroups)
          router.push('/groups')
        })
        .catch(error => {
          console.log(error)
        })
    },

    updateGroup({commit, getters}, payload) {

      const updateObj = {}

      firebase.database().ref('groups/').child(payload.id).once('value')
        .then(data => {
          console.log("Group Updated Successfully")

          const dbGroup = data.val()

        })
        .catch(error => {
          (error)
        })
    },

    addOrRemoveUserInGroup({commit, getters, dispatch}, payload){
      console.log("addUserToGroup")
      var user = getters.user
      firebase.database().ref('groups/').child(payload.groupId).once('value')
        .then(data => {

          const dbGroup = data.val()

          console.log(dbGroup)
          if(dbGroup.userIds){

            if(!dbGroup.userIds.find(n => n === payload.uid)){

              dbGroup.userIds.push(payload.uid)
            }else{

              dbGroup.userIds = dbGroup.userIds.filter(function(entry){
                return entry !== payload.uid
              })              
            }
          }

          return firebase.database().ref('groups/').child(payload.groupId).update(dbGroup)
        })
        .then(data => {
          console.log('#addOrRemoveUserInGroup successfully')
          
        })
        .catch(error => {
          console.log('Error while trying to add user to group: ' + error)
        })
    },

  },
  getters: {

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
}
