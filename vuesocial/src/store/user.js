import * as firebase from 'firebase';
import router from '@/router'


export default {
  state: {
    user: '',
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
  },
  actions: {
    fetchUserData({dispatch, commit}) {
      console.log('Fetching User Data!')

      dispatch('fetchPosts')
      dispatch('fetchGroups')
    },
    login({dispatch, commit, getters}, payload) {
      console.log('logging in')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(data => {

          return firebase.database().ref('/users/' + data.user.uid).once('value')

        })
        .then(user => {

          commit('setUser', user.val())

        })
        .catch(error => {
          console.log(error)
        })
        dispatch('fetchUserData')
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

      })
      .catch(error => {
        console.log(error)
      })

      dispatch('fetchUserData')
    },
  },
  getters: {
    user(state) {

      if (state.user !== null && state.user !== undefined){
          return state.user[Object.keys(state.user)[0]]
      }
      return null

    },
  }
}
