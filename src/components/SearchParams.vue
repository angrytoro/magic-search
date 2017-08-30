<template>
  <div>
    <div class="search-current" v-for="(item, key) in params" :key="key">
      <span class="title">{{item.label}}:</span>
      <span class="content">{{item.display_value}}</span>
      <span class="remove" @click="handleDelete(key)">X</span>
    </div>
  </div>
</template>

<script>
  /**
  params格式{'xxx': {label: '展示的label名称', value: '最终传给后端的值', display_value: '展示给用户的值'}}
   */
  export default {
    props: {
      params: {
        type: Object,
        default: {}
      }
    },
    methods: {
      handleDelete (key) {
        this.$emit('delete', key)
      }
    }
  }
</script>