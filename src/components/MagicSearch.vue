<template>
  <div>
    <search-params :params="params" @delete="handleParamDelete"></search-params>
    <div>
      <div><label><span v-show="currentMenuItem.label">{{currentMenuItem.label}}:</span><input ref="searchInput" @keyup.enter="handleInputEnter" @keyup.delete="handleInputDelete" @focus="handleInputFocus" @blur="handleInputBlur" v-model.trim="key"></label></div>
      <search-menu :status="status === 'KEY_STATUS'" :data="currentMenuData" @select="handleMenuSelect"></search-menu>
    </div>
  </div>
</template>

<script>
  import SearchMenu from './SearchMenu'
  import SearchParams from './SearchParams'
  const BLUR_STATUS = '' // blur状态
  const KEY_STATUS = 'KEY_STATUS' // 选择关键字状态
  const VALUE_STATUS = 'VALUE_STATUS' // 赋值状态
  export default {
    components: {
      SearchMenu,
      SearchParams
    },
    props: {
      menuData: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        params: {},
        key: '',
        currentMenuItem: {},
        status: BLUR_STATUS // 输入框的三种状态：blur状态，选择关键字状态，赋值状态
      }
    },
    computed: {
      currentMenuData () {
        return this.menuData.filter((item) => {
          return !this.params[item.name] || this.currentMenuItem.name && item.name !== this.currentMenuItem.name
        })
      }
    },
    methods: {
      handleParamDelete (key) {
        this.$delete(this.params, key)
      },
      handleInputFocus () {
        if (this.currentMenuItem.name) { // 如果已经是选择了要搜索的选项。
          this.status = VALUE_STATUS
        } else {
          this.status = KEY_STATUS
        }
      },
      handleInputEnter () {
        if (this.currentMenuItem.name && this.key) {
          this.$set(this.params, this.currentMenuItem.name, {label: this.currentMenuItem.label, value: this.key})
          this.currentMenuItem = {}
          this.key = ''
          this.status = KEY_STATUS
        }
      },
      handleInputDelete () {
        if (!this.key && this.currentMenuItem.name) {
          this.currentMenuItem = {}
        }
      },
      handleInputBlur () {
        setTimeout(() => {
          if (this.status !== VALUE_STATUS) {
            this.status = BLUR_STATUS
          }
        }, 400)
      },
      handleMenuSelect (item) {
        this.currentMenuItem = {...item}
        // TODO 处理赋值选项，根据type来判断是否展示下拉或者日历
        this.status = VALUE_STATUS
        this.key = ''
        this.$refs.searchInput.focus()
      }
    }
  }
</script>