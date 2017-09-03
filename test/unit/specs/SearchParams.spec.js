import Vue from 'vue'
import SearchParams from '@/components/SearchParams'

describe('SearchParams', () => {
  it('renders correctly', () => {
    const Ctor = Vue.extend(SearchParams)
    const vm = new Ctor({
      propsData: {
        params: {
          name: {
            label: '姓名',
            value: 'panyx',
            display_value: '潘用新'
          }
        }
      }
    }).$mount()
    expect(vm.$el.querySelector('.search-current .title').textContent).to.equal('姓名:')
    expect(vm.$el.querySelector('.search-current .content').textContent).to.equal('潘用新')
  })
})
