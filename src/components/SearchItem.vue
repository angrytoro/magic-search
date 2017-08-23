<template>
  <li @click="handleClick">{{data.label}}</li>
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