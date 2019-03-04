import * as axios from 'axios'

export default {
    async authenticate({commit}, {username, password}){

        const authenticated = await axios.post('/api/authenticate', {
            username, password
        })
        commit('SET_AUTHENTICATED', authenticated)
        
    }
}