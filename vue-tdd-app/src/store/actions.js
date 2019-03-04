import * as axios from 'axios'

export default {
    async authenticate({commit}, {username, password}){
        try {
            const authenticated = await axios.post('/api/authenticate', {
                username, password
            })    
            commit('SET_AUTHENTICATED', authenticated)
        } catch (error) {
            throw Error('API Error occurred.')
        }
    }
}