import { shallowMount } from '@vue/test-utils'
import SmallPostItem from '@/components/posts/SmallPostItem.vue'

describe('SmallPostItem.vue', () => {
  it('renders a small list item when pass', () => {
    const text = 'this is the first post'
    const wrapper = shallowMount(SmallPostItem, {
      propsData: { text }
    })
    expect(wrapper.text()).toMatch(text)
  })
})
