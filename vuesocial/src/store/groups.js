import * as firebase from 'firebase';
import router from '@/router'

export default {
  state: {
    groups: [],
    joinedGroups: []
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
    joinGroup(state, payload) {
      if(state.joinedGroups.indexOf(payload.groupId) === -1){
        state.joinedGroups.push(payload.groupId)
      }
    },

    leaveGroup(state, payload) {
      const newJoinedGroups = []
      state.joinedGroups.map(function(entry) {
        if (entry !== payload.groupId){
          newJoinedGroups.push(entry)
        }
      })
      state.joinedGroups = newJoinedGroups
    },
  },
  actions: {
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
    createGroup({commit, getters}, payload) {

      const user = getters.user

      const group = {
        name: payload.name,
        description: payload.description,
        creatorId: user.id
      }

      firebase.database().ref('groups/').push(group)
        .then(data => {

          return firebase.database().ref('/groups/').once('value')
        })
        .then(data => {

          const updatedGroups = data.val()

          commit('setGroups', updatedGroups)

          router.push('/groups')
        })
        .catch(error => {
          console.log(error)
        })
    },
    joinGroup({commit, getters}, payload){
      console.log('joinGroup')

      if(getters.joinedGroups.indexOf(payload.groupId)!== -1){
        return
      }

      const user = getters.user

      firebase.database().ref('users/' + user.id + '/groupsJoined/' + payload.groupId).push(payload)
        .then(data => {

          commit('joinGroup', {groupId: payload.groupId, userId: user.id})
        })
        .catch(error => {
          console.log(error)
        })

    },
    leaveGroup({commit, getters}, payload){
      console.log('leaveGroup')
      console.log(payload.groupId)
      const user = getters.user

      firebase.database().ref('users/' + user.id + '/groupsJoined/').child(payload.groupId).remove()
        .then(data => {
          console.log('sucessfully left group')
          commit('leaveGroup', {groupId: payload.groupId})
        })
        .catch(error => {
          console.log(error)
        })

    },
  },
  getters: {
    joinedGroups(state) {
      return state.joinedGroups
    },

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
      console.log('getPostsInGroup')

      return (groupId) => {

        var count = 0
        const posts = getters.posts
        for (var i = 0; i < posts.length; i++){
            if (posts[i].groupId === groupId){
              count++
            }
        }
        return count
      }
    },
  }
}
