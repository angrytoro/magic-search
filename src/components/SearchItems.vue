<template>
  <ul class="search-ul">
    <search-item v-for="item in data" :data="item" @select="handleSelect" :key="item.name"></search-item>
  </ul>
</template>

<script>
  import SearchItem from './SearchItem'
  export default {
    components: {
      SearchItem
    },
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    methods: {
      handleSelect (value) {
        this.$emit('select', {...value})
      }
    }
  }
</script>