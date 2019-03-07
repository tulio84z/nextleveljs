import { shallowMount } from '@vue/test-utils'
import ListPosts from '@/components/posts/ListPosts.vue'

describe('ListPosts.vue', () => {
  it('Renders a small list when store has posts', () => {
    
    
    
    
    
    const text = 'this is the first post'
    const wrapper = shallowMount(ListPosts, {
      propsData: { text }
    })
    expect(wrapper.text()).toMatch(text)
  })
})
