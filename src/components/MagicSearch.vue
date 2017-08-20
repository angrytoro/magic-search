<template>
  <div>
    <search-params :params="params" @delete="handleParamDelete"></search-params>
    <div>
      <div><input @keyup.enter="handlerInputEnter" @focus="handleInputFocus" v-model.trim="key"></div>
      <search-menu :status="status === 'KEY_STATUS'" :data="menuData" @select="handleMenuSelect"></search-menu>
    </div>
  </div>
</template>

<script>
  import SearchMenu from './SearchMenu';
  import SearchParams from './SearchParams';
  const BLUR_STATUS = ''; // blur状态
  const KEY_STATUS = 'KEY_STATUS'; // 选择关键字状态
  const VALUE_STATUS = 'VALUE_STATUS'; // 赋值状态
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
    data() {
      return {
        _menuData: [],
        params: {},
        key: '',
        currentMenuItem: {},
        status: BLUR_STATUS // 输入框的三种状态：blur状态，选择关键字状态，赋值状态
      };
    },
    watch: {
      menuData(val) {
        this._menuData = val;
      }
    },
    computed: {
    },
    methods: {
      handleParamDelete(key) {
        this.$delete(this.params, key);
      },
      handleInputFocus() {
        if (this.currentMenuItem.name) { // 如果已经是选择了要搜索的选项。
          this.status = VALUE_STATUS;
        } else {
          this.status = KEY_STATUS;
        }
      },
      handlerInputEnter() {
        if (this.currentMenuItem.name && this.key) {
          this.$set(this.params, this.currentMenuItem.name, this.key);
          this.currentMenuItem = {};
          this.key = '';
          this.state = KEY_STATUS;
        }
      },
      handleMenuSelect(item) {
        this.currentMenuItem = item;
        // TODO 处理赋值选项，根据type来判断是否展示下拉或者日历
        this.status = VALUE_STATUS;
        this.key = '';
        this._menuData = this.menuData.filter((value) => {
          return value.name != item.name;
        });
      }
    }
  }
</script>