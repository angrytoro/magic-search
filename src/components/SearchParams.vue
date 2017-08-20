<template>
  <div>
    <div v-for="(value, key) in params" :key="key">
      <span>{{key}}:{{value}}</span>
      <span @click="handleDelete(key)">X</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      params: {
        type: Object,
        default: {}
      }
    },
    methods: {
      handleDelete(key) {
        this.$emit('delete', key);
      }
    }
  }
</script>