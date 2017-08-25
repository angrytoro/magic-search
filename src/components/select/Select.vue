<template>
  <ul>
    <Option v-for="(value, key) in data" :data="{'key': key, 'value': value}" @select="handleSelect"></Option>
  </ul>
</template>

<script>
  import Option from './Option'
  export default {
    components: {
      Option
    },
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    methods: {
      handleSelect (data) {
        this.$emit('select', data)
      }
    }
  }
</script>