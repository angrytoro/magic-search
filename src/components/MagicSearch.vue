<template>
  <div>
    <search-params :params="params" @delete="handleParamDelete"></search-params>
    <div>
      <div><label><span v-show="currentSearchItem.label">{{currentSearchItem.label}}:</span><input ref="searchInput" @keyup.enter="handleInputEnter" @keyup.delete="handleInputDelete" @focus="handleInputFocus" @blur="handleInputBlur" v-model.trim="key"></label></div>
      <search-items :status="status === 'KEY_STATUS'" :data="currentSearchItems" @select="handleSearchItemSelect"></search-items>
    </div>
  </div>
</template>

<script>
  import SearchItems from './SearchItems'
  import SearchParams from './SearchParams'
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
        status: BLUR_STATUS // 输入框的三种状态：blur状态，选择关键字状态，赋值状态
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
        if (this.currentSearchItem.name && this.key) {
          this.$set(this.params, this.currentSearchItem.name, {label: this.currentSearchItem.label, value: this.key, diaplay_value: this.key})
          this.currentSearchItem = {}
          this.key = ''
          this.status = KEY_STATUS
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
        this.status = VALUE_STATUS
        this.key = ''
        this.$refs.searchInput.focus()
        // if (item.type.toUpperCase() === 'SELECT') {

        // }
      }
    }
  }
</script>