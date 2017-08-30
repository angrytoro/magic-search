<template>
  <li @click="handleClick">
    <a href="javascript:;">{{data.label}}</a>
  </li>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        validator (value) {
          return value && (!value.type || ['TEXT', 'SELECT', 'MULT-SELECT', 'DATE'].indexOf(value.type.toUpperCase()) > -1)
        }
      }
    },
    methods: {
      handleClick () {
        this.$emit('select', {...this.data})
      }
    }
  }
</script>