import * as firebase from 'firebase';
import router from '@/router'

function getUserById(uid){
    var dbUser = null
    return firebase.database().ref('/users/' + uid).once('value')
          .then(data => {
  
            var dbUser = data.val()
            
            const creator = {
              name: Object.values(dbUser)[0].name,
              id: Object.values(dbUser)[0].id
            }
            return creator
          })
          .catch(error => {
            console.log(error)
          })
    return null
}

export default {
    fetchUserData({dispatch, commit}, userId) {
  
        dispatch('fetchPosts')
        dispatch('fetchGroups')
        dispatch('fetchGroupsJoined', userId)
      },
  
      fetchGroupsJoined({dispatch, commit, getters}, userId) {
  
        firebase.database().ref('users/' + userId + '/groupsJoined/').once('value')
          .then(data => {
  
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
  
            return dispatch('addOrRemoveUserInGroup', {groupId: payload.groupId, uid: user.id})
            
          })
          .then(() => {
            dispatch('fetchUserData', user.id)
          })
          .catch(error => {
            console.log(error)
          })
      },
  
      leaveGroup({commit, getters, dispatch}, payload){
        console.log('leaveGroup')
        console.log(payload.groupId)
        console.log(payload.id)
  
        firebase.database().ref('users/' + payload.id + '/groupsJoined/').child(payload.groupId).remove()
          .then(data => {
            console.log('sucessfully left group')
            dispatch('addOrRemoveUserInGroup', {groupId: payload.groupId, uid: payload.id})
            dispatch('fetchUserData', payload.id)
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
  
        firebase.database().ref('/users/' + payload.uid).once('value')
        .then(user => {
  
          commit('setUser', user.val())
          dispatch('fetchUserData', payload.uid)
        })
        .catch(error => {
          console.log(error)
        })
  
      },
      getUserById({dispatch}, userId) {
  
        var emptyUserString = 'empty' 
        if(!userId){
          return emptyUserString
        }
        
        return getUserById(userId)
      },
}