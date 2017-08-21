<template>
  <li @click="handleClick">{{data.label}}</li>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    methods: {
      handleClick () {
        this.$emit('select', {...this.data})
      }
    }
  }
</script>