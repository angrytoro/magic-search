<template>
  <li @click="handleClick" :class="{selected: checked}">
    <input type="checkbox" v-if="mult" v-model="checked">
    <a href="javascript:;">{{data.value}}</a>
  </li>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        validator (item) {
          return item && item.key && item.value
        }
      },
      mult: { // 是否多选，默认不是多选
        type: Boolean,
        default: false
      },
      selected: { // 是否是选中的
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        checked: this.selected
      }
    },
    methods: {
      handleClick () {
        this.checked = !this.checked
        if (this.checked) {
          this.$emit('select', this.data)
        } else {
          this.$emit('unselect', this.data)
        }
      }
    }
  }
</script>

<style>
  .selected {
    background: red;
  }
</style>