import * as firebase from 'firebase';
import router from '@/router'

export default {
  state: {
    groups: [],
    // joinedGroups: []
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

    deleteGroup({commit}, payload){
      console.log(('deleteGroup action called'))

      firebase.database().ref('/groups/').child(payload.id).remove()
        .then(data => {
          console.log('Sucessfully deleted group!')
          return dispatch('removeGroupForUser', {})
        })
        .catch(error => {
          console.log('Error while trying to remove group:' + error)
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
    createGroup({commit, getters, dispatch}, payload) {

      const user = getters.user

      const group = {
        name: payload.name,
        description: payload.description,
        creatorId: user.id,
        usersJoined: 0,
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
      console.log("Updating Group")
      const updateObj = {}

      firebase.database().ref('groups/').child(payload.id).once('value')
        .then(data => {
          console.log("Group Updated Successfully")

          const dbGroup = data.val()

        })
        .catch(error => {
          console.log(error)
        })

    },

    addOrRemoveUserInGroup({commit, getters, dispatch}, payload){
      console.log("addUserToGroup")
      var user = getters.user
      firebase.database().ref('groups/').child(payload.groupId).once('value')
        .then(data => {
          console.log('here:')
          console.log(data.val())

          const dbGroup = data.val()
          if(dbGroup.userIds){

            if(!dbGroup.userIds.find(n => n === payload.uid)){
              console.log('entry NOT found')
              dbGroup.userIds.push(payload.uid)
            }else{
              console.log('REMOOOOOOVING ENTRY')
              console.log(dbGroup)
              dbGroup.userIds = dbGroup.userIds.filter(function(entry){
                return entry !== payload.uid
              })              
              console.log('Updated array:')
              console.log(dbGroup)
            }
          }

          return firebase.database().ref('groups/').child(payload.groupId).update(dbGroup)
        })
        .then(data => {
          console.log('#addOrRemoveUserInGroup successfully')
          console.log(data)
        })
        .catch(error => {
          console.log('Error while trying to add user to group: ' + error)
        })


    },

    // increaseUserCount({commit, getters}, groupId) {
    //   console.log("increaseUserCount")
    //   firebase.database().ref('groups/').child(groupId).once('value')
    //     .then(data => {
    //       const dbGroup = data.val()
    //       dbGroup.usersJoined++

    //       return firebase.database().ref('groups/').child(groupId).update(dbGroup)

    //     })
    //     .then(data => {
    //       console.log('#usersJoined increased successfully')
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    // decreaseUserCount({commit, getters}, groupId) {
    //   console.log("decreaseUserCount")
    //   firebase.database().ref('groups/').child(groupId).once('value')
    //     .then(data => {
    //       const dbGroup = data.val()
    //       dbGroup.usersJoined--
    //       if (dbGroup.usersJoined < 0) {
    //         dbGroup.usersJoined = 0
    //       }

    //       return firebase.database().ref('groups/').child(groupId).update(dbGroup)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },


  },
  getters: {

    groups(state) {
      return state.groups
    },

    getGroupById(state, getters) {
      return (groupId) => {
        return getters.groups.find(n => n.id === groupId)
      }
    },
    getGroupByCurrUser(state, getters) {

      if(getters.user === null){
        return
      }
      const userGroups = []

      getters.groups.map(function(entry) {
        if(entry.creatorId === getters.user.id) {
          userGroups.push(entry)
        }
      })
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
