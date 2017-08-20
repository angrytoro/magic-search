<template>
  <ul>
    <menu-item v-for="item in data" :name="item.name" :label="item.label" :type="item.type || 'text'" :value="item.value" @select="handleSelect" :key="item.name"></menu-item>
  </ul>
</template>

<script>
  import MenuItem from './MenuItem';
  export default {
    components: {
      MenuItem
    },
    props: {
      data: {
        type: Array,
        required: true
      },
      status: { // 状态: 显示还是隐藏
        type: Boolean,
        default: true
      }
    },
    methods: {
      handleSelect(value) {
        this.$emit('select', value);
      }
    }
  }
</script>