import * as firebase from 'firebase';
import router from '@/router'


export default {
  state: {
    user: '',
    joinedGroups: []
  },
  mutations: {
    setUser(state, payload) {
      console.log('setting User')
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
  },

  actions: {
    fetchUserData({dispatch, commit}, userId) {
      console.log('Fetching User Data!')

      dispatch('fetchPosts')
      dispatch('fetchGroups')
      dispatch('fetchGroupsJoined', userId)
    },

    fetchGroupsJoined({dispatch, commit, getters}, userId) {

      firebase.database().ref('users/' + userId + '/groupsJoined/').once('value')
        .then(data => {
          console.log('fetchGroupsJoined')
          console.log(data.val())
          if (data.val()){
            const joinedGroups = Object.keys(data.val())
            commit('setJoinedGroups', joinedGroups)
          }else {
            commit('setJoinedGroups', [])
          }

        })
        .catch(error => {
          console.log(error)
        })
    },

    joinGroup({commit, getters, dispatch}, payload){
      console.log('joinGroup')

      if(getters.joinedGroups.indexOf(payload.groupId)!== -1){
        return
      }

      const user = getters.user
      firebase.database().ref('users/' + user.id + '/groupsJoined/' + payload.groupId).once('value')
        .then(data => {
          if (!data.val()) {
            return firebase.database().ref('users/' + user.id + '/groupsJoined/' + payload.groupId).push(payload)
          }
          throw "User already Joined"

        })
        .then(data => {

          dispatch('increaseUserCount', payload.groupId)
          dispatch('fetchUserData', user.id)
        })
        .catch(error => {
          console.log(error)
        })
    },

    leaveGroup({commit, getters, dispatch}, payload){
      console.log('leaveGroup')
      console.log(payload.groupId)
      const user = getters.user

      firebase.database().ref('users/' + user.id + '/groupsJoined/').child(payload.groupId).remove()
        .then(data => {
          console.log('sucessfully left group')
          dispatch('decreaseUserCount', payload.groupId)
          dispatch('fetchUserData', user.id)
        })
        .catch(error => {
          console.log(error)
        })

    },

    login({dispatch, commit, getters}, payload) {
      console.log('logging in')
      var userId = null
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          userId = data.user.uid
          return firebase.database().ref('/users/' + data.user.uid).once('value')

        })
        .then(user => {

          dispatch('fetchUserData', userId)
          commit('setUser', user.val())
        })
        .catch(error => {
          console.log(error)
        })

    },
    logout({commit}, payload) {

      commit('setUser', null)
      commit('setPosts', null)
      commit('setGroups', null)
      router.push('/')
    },
    signup({commit}, payload) {
      console.log('Signing Up')

      const newUser = {
        id: '',
        email: payload.email,
        name: payload.name,
      }
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          newUser.id = user.user.uid

          return firebase.database().ref('users/' + newUser.id).push(newUser)

        })
        .then(data => {
          commit('setUser', newUser)
        })
        .catch(error => {
          console.log(error)
        })
    },

    autoSignIn ({dispatch, commit}, payload) {
      console.log('autoSignIn')

      firebase.database().ref('/users/' + payload.uid).once('value')
      .then(user => {

        commit('setUser', user.val())
        dispatch('fetchUserData', payload.uid)
      })
      .catch(error => {
        console.log(error)
      })

    },
    getPostCreator({dispatch}, payload) {
      console.log('getPostCreator')
      
      var emptyUserString = 'empty' 
      if(!payload){
        return emptyUserString
      }
      
      
      return firebase.database().ref('/users/' + payload.creatorId).once('value')
        .then(data => {
          console.log(data.val())
          var dbUser = data.val()
          
          const creator = {
            name: Object.values(dbUser)[0].name,
          }
          return creator
        })
        .catch(error => {
          console.log(error)
          return emptyUserString
        })
    }
  },
  getters: {
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
}
