<template>
  <div class="magic-search">
    <div class="magic-search__inner">
      <span class="magic-search__go">
        <i>ic</i>
      </span>
      <div class="magic-search__main">
        <div class="m-search">
          <div class="m-search__area">
            <SearchParams :params="params" @delete="handleParamDelete"></SearchParams>
            <span class="search-selected"  v-show="currentSearchItem.label">{{currentSearchItem.label}}:</span>
            <div class="search-entry">
              <input class="search-input" placeholder="Click here for filters." ref="searchInput" @keyup.enter="handleInputEnter" @keyup.delete="handleInputDelete" @focus="handleInputFocus" @blur="handleInputBlur" v-model.trim="key">
              <SearchItems v-show="status === 'KEY_STATUS'" :data="currentSearchItems" @select="handleSearchItemSelect"></SearchItems>
              <SelectCom v-show="showSelect" :mult="isMultSelect" :data="selectData" @select="handleSetSelectValue"></SelectCom>
            </div>
          </div>
        </div>
      </div>
      <span class="magic-search__clear"  title="清空" @click="clearSearchParams">
				<i>c</i>
			</span>
    </div>
  </div>
</template>

<script>
  import '@/styles/magic-search.css'
  import SearchItems from './SearchItems'
  import SearchParams from './SearchParams'
  import SelectCom from './select/Select'
  const BLUR_STATUS = '' // blur状态
  const KEY_STATUS = 'KEY_STATUS' // 选择关键字状态
  const VALUE_STATUS = 'VALUE_STATUS' // 赋值状态
  export default {
    components: {
      SearchItems,
      SearchParams,
      SelectCom
    },
    props: {
      searchItems: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        params: {},
        key: '',
        currentSearchItem: {},
        status: BLUR_STATUS, // 输入框的三种状态：blur状态，选择关键字状态，赋值状态
        showSelect: false,
        isMultSelect: false
      }
    },
    computed: {
      currentSearchItems () {
        return this.searchItems.filter((item) => {
          return !this.params[item.name] || this.currentSearchItem.name && item.name !== this.currentSearchItem.name
        })
      },
      selectData () {
        if (!this.currentSearchItem.name) {
          return {}
        }
        if (!this.key) {
          return {...this.currentSearchItem.options}
        }
        const type = this.currentSearchItem.type.toUpperCase()
        if (type === 'SELECT' || type === 'MULT-SELECT') {
          let result = {}
          Object.keys().forEach(key => {
            let val = this.currentSearchItem.options[key]
            if (val.indexOf(this.key) > -1) {
              result[key] = val
            }
          })
          return result
        }
        return {}
      }
    },
    methods: {
      _setSearchItemValue (name, val) {
        this.$set(this.params, name, val) // 新增搜索参数
        this.currentSearchItem = {} // 将当前赋值的搜索项置空
        this.key = '' // 将输入框值设置为空
        this.status = KEY_STATUS // 将状态这种为选择搜索项状态
      },
      clearSearchParams () {
        this.$set(this, 'params', {})
        this.$set(this, 'currentSearchItem', {})
      },
      handleParamDelete (key) {
        this.$delete(this.params, key)
      },
      handleInputFocus () {
        if (this.currentSearchItem.name) { // 如果已经是选择了要搜索的选项。
          this.status = VALUE_STATUS
        } else {
          this.status = KEY_STATUS
        }
      },
      handleInputEnter () {
        if (this.currentSearchItem.name && this.currentSearchItem.type.toUpperCase() === 'TEXT' && this.key) { // 如果是处于赋值状态，并且当前的搜索项是text类型，同时输入框又有值，那么就开始赋值
          this._setSearchItemValue(this.currentSearchItem.name, {label: this.currentSearchItem.label, value: this.key, display_value: this.key})
        }
      },
      handleInputDelete () {
        if (!this.key && this.currentSearchItem.name) {
          this.currentSearchItem = {}
          this.key = '' // 将输入框值设置为空
          this.status = KEY_STATUS // 将状态这种为选择搜索项状态
          this.showSelect = false
        }
      },
      handleInputBlur () {
        setTimeout(() => {
          if (this.status !== VALUE_STATUS) {
            this.status = BLUR_STATUS
          }
        }, 300)
      },
      handleSearchItemSelect (item) {
        this.currentSearchItem = {...item}
        this.status = VALUE_STATUS // 将当前状态设置为赋值状态
        this.key = '' // 将输入框的值设置为空
        this.$refs.searchInput.focus() // 将输入框设置为focus状态

        const type = item.type.toUpperCase()
        if (type === 'SELECT') {
          this.showSelect = true
          this.isMultSelect = false
        }
        if (type === 'MULT-SELECT') {
          this.showSelect = true
          this.isMultSelect = true
        }
      },

      handleSetSelectValue (val) {
        this.showSelect = false
        this.$refs.searchInput.focus() // 将输入框设置为focus状态
        if (this.isMultSelect) {
          let value = []
          let displayValue = []
          val.forEach(item => {
            value.push(item.key)
            displayValue.push(item.value)
          })
          this._setSearchItemValue(this.currentSearchItem.name, {label: this.currentSearchItem.label, value: value.join(','), display_value: displayValue.join(',')})
        } else {
          this._setSearchItemValue(this.currentSearchItem.name, {label: this.currentSearchItem.label, value: val.key, display_value: val.value})
        }
      }
    }
  }
</script>