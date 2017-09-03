import Vue from 'vue'
import MagicSearch from '@/components/MagicSearch'

const BLUR_STATUS = '' // blur状态
const searchItems = [
  {
    name: 'name',
    label: '姓名',
    type: 'text'
  },
  {
    name: 'status',
    label: '状态',
    type: 'mult-select',
    options: {
      active: '激活',
      'delete': '删除',
      offline: '下线',
      'new': '新建'
    }
  },
  {
    name: 'visibility',
    label: '是否可见',
    type: 'select',
    options: {
      ok: '是',
      no: '否'
    }
  },
  {
    name: 'min',
    label: '最小值',
    type: 'text'
  },
  {
    name: 'max',
    label: '最大值',
    type: 'text'
  }
]

describe('MagicSearch', () => {
  it('set the correct default data', () => {
    expect(typeof MagicSearch.data).to.equal('function')
    const defaultData = MagicSearch.data()
    expect(defaultData.params).be.empty
    expect(defaultData.status).to.equal(BLUR_STATUS)
    expect(defaultData.showSelect).to.equal(false)
    expect(defaultData.isMultSelect).to.equal(false)
  })

  it('renders correctly', (done) => {
    const Ctor = Vue.extend(MagicSearch)
    const vm = new Ctor({
      propsData: {
        searchItems
      }
    }).$mount()
    expect(vm.currentSearchItems.length).to.equal(5)
    expect(vm.selectData).be.empty
    done()
  })
})
