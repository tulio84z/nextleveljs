import * as firebase from 'firebase';

export default {
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV8aJFj8xS1koLcFV7XpWa0BzGYq2z4BBvaFQEfDHQ5HMR_7vj',
        id: '1',
        title: 'Meetup in New York',
        date: new Date(),
        location: "New York",
        description: "Meetup in new york, new york"
      },
      {
        imageUrl: 'https://www.telegraph.co.uk/content/dam/Travel/hotels/europe/france/paris/paris-cityscape-overview-guide-xlarge.jpg',
        id: '2',
        title: 'Meetup in Paris',
        date: new Date(),
        location: "Paris",
        description: "Meetup in Parrrris"
      }
    ],

  },
  mutations: {

    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload
    }
    ,
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup(data, payload) {
        const meetup = state.loadedMeetups.find(meetup => {
          return meetup.id === payload.id
        })
        if(payload.title) {
          meetup.title = payload.title
        }
        if(payload.description) {
          meetup.description = payload.description
        }
        if(payload.date) {
          meetup.date = payload.date
        }
    },

  },
  actions: {

    loadMeetups({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for(let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    updateMeetupData({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if(payload.title){
        updateObj.title = payload.title
      }
      if(payload.description) {
        updateObj.description = payload.description
      }
      if(payload.date){
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() =>{
          commit('setLoading',false)
          commit('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading',false)
        })

    },

    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: '',
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }

      let imageUrl
      let key
      // Reach out to firebase and store it
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + '' + ext).put(payload.image)
        })
        .then(fileData => {
          let imagePath = fileData.metadata.fullPath
          console.log(imagePath)
          return firebase.storage().ref().child(imagePath).getDownloadURL();
        })
        .then(url => {
          imageUrl = url
          console.log(imageUrl)
          console.log(key)
          return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },

    featuredMeetups (state, getters){
      return getters.loadedMeetups.slice(0,5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id == meetupId
        })
      }
    },
  }
}
