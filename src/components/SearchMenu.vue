<template>
  <ul v-show="status">
    <item v-for="item in data" :data="item" @select="handleSelect" :key="item.name"></item>
  </ul>
</template>

<script>
  import MenuItem from './MenuItem'
  export default {
    components: {
      item: MenuItem
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