<template>
  <div id="app">
    <img src="./assets/logo.png">
    <magic-search :menu-data="menuData"></magic-search>
  </div>
</template>

<script>
import MagicSearch from './components/MagicSearch'

export default {
  name: 'app',
  components: {
    MagicSearch
  },
  data () {
    return {
      menuData: [
        {
          name: 'name',
          label: '姓名',
          type: 'text'
        },
        {
          name: 'status',
          label: '状态',
          type: 'select'
        },
        {
          name: 'visibility',
          label: '是否可见',
          type: 'select'
        },
        {
          name: 'min',
          label: '最小值',
          type: 'text'
        },
        {
          name: 'max',
          label: '最大值',
          type: 'text'
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
