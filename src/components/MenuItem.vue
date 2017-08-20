<template>
  <li @click="handleClick">{{label}}</li>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      type: { // 搜索选项类型，默认text。可支持select,mult-select,datepicker
        type: String,
        default: 'text'
      },
      value: {
        validator() {
          return true;
        }
      }
    },
    methods: {
      handleClick() {
        this.$emit('select', { name: this.name, type: this.type, value: this.value});
      }
    }
  }
</script>