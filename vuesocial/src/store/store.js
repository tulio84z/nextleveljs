import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/user'
import posts from '@/store/posts'
import groups from '@/store/groups'


Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user: user,
    posts: posts,
    groups: groups
  }
})
