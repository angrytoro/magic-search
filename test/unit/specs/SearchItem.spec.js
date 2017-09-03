import Vue from 'vue'
import SearchItem from '@/components/SearchItem'

describe('SearchItem', () => {
  it('renders correctly', () => {
    const Ctor = Vue.extend(SearchItem)
    const vm = new Ctor({
      propsData: {
        data: {
          name: 'name',
          label: '姓名',
          type: 'text'
        }
      }
    }).$mount()
    expect(vm.$el.querySelector('a').textContent).to.equal('姓名')
  })
})
