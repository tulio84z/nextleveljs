import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ListPosts from '@/components/posts/ListPosts.vue'


const localVue = createLocalVue()

localVue.use(Vuex)

const store = new Vuex.Store({

  state: {
    posts: [
      {
        "creatorId":"s2j1aPokpHe6DnZggYnd6GQjkJL2",
        "groupId":"-L_N9enDUUwXlUWtCquA",
        "message":"asdf",
        "title":"adsf",
        "url":"https://i0.wp.com/smartereum.com/wp-content/uploads/2018/03/Bitcoin-Price-Today-What-is-triggering-the-Bitcoin-sell-off.jpg","id":"-LZyH2vmYRc98eDHWmfe"}
    ],
  },

  getters: {
    getPostsByUser: (state, getters) => state.posts[0]
  }
})

describe('ListPosts.vue', () => {
  it('Renders a small list when store has posts', () => {
    
    
    const wrapper = shallowMount(ListPosts, { store, localVue })

    console.log(wrapper)

    //expect(wrapper.find('.username').text()).toBe('alice')

  })
})
