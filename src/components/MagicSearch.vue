<template>
  <div>
    <SearchParams :params="params" @delete="handleParamDelete"></SearchParams>
    <div>
      <div><label><span v-show="currentSearchItem.label">{{currentSearchItem.label}}:</span><input ref="searchInput" @keyup.enter="handleInputEnter" @keyup.delete="handleInputDelete" @focus="handleInputFocus" @blur="handleInputBlur" v-model.trim="key"></label></div>
      <SearchItems :status="status === 'KEY_STATUS'" :data="currentSearchItems" @select="handleSearchItemSelect"></SearchItems>
      <Select v-show="showSelect" :mult="isMultSelect" :data="selectData" @select="handleSetSelectValue"></Select>
    </div>
  </div>
</template>

<script>
  import SearchItems from './SearchItems'
  import SearchParams from './SearchParams'
  import Select from './select/Select'
  const BLUR_STATUS = '' // blur状态
  const KEY_STATUS = 'KEY_STATUS' // 选择关键字状态
  const VALUE_STATUS = 'VALUE_STATUS' // 赋值状态
  export default {
    components: {
      SearchItems,
      SearchParams
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
        isMultSelect: false,
        selectData: {}
      }
    },
    computed: {
      currentSearchItems () {
        return this.searchItems.filter((item) => {
          return !this.params[item.name] || this.currentSearchItem.name && item.name !== this.currentSearchItem.name
        })
      }
    },
    methods: {
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
          this.$set(this.params, this.currentSearchItem.name, {label: this.currentSearchItem.label, value: this.key, display_value: this.key}) // 新增搜索参数
          this.currentSearchItem = {} // 将当前赋值的搜索项置空
          this.key = '' // 将输入框值设置为空
          this.status = KEY_STATUS // 将状态这种为选择搜索项状态
        }
      },
      handleInputDelete () {
        if (!this.key && this.currentSearchItem.name) {
          this.currentSearchItem = {}
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
        // TODO 处理赋值选项，根据type来判断是否展示下拉或者日历
        this.status = VALUE_STATUS // 将当前状态设置为赋值状态
        this.key = '' // 将输入框的值设置为空
        this.$refs.searchInput.focus() // 将输入框设置为focus状态

        if (item.type.toUpperCase() === 'SELECT') {
          this.showSelect = true;
          this.selectData = this.currentSearchItem.options;
        }
      },

      handleSetSelectValue (val) {

      }
    }
  }
</script>