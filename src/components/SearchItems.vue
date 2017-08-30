<template>
  <ul class="search-ul" v-show="status">
    <search-item v-for="item in data" :data="item" @select="handleSelect" :key="item.name"></search-item>
  </ul>
</template>

<script>
  import SearchItem from './SearchItem'
  export default {
    components: {
      SearchItem
    },
    props: {
      data: {
        type: Array,
        required: true
      },
      status: { // 状态: 显示还是隐藏
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleSelect (value) {
        this.$emit('select', {...value})
      }
    }
  }
</script>