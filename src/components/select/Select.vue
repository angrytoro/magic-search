<template>
  <div>
    <ul class="search-ul">
      <Option v-for="(value, key) in data" :data="{'key': key, 'value': value}" :mult="mult" :selected="isSelected(key)" @select="handleSelect" @unselect="handleUnselect" :key="key"></Option>
    </ul>
    <div v-show="mult">
      <button @click="handleConfirm">确认</button>
    </div>
  </div>
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
      },
      mult: { // 是否多选，默认不是多选
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        selected: []// 多选的时候需要用到,数组里面的对象是{key: 'xxx', value: 'xxx'}
      }
    },
    methods: {
      isSelected (key) {
        if (this.mult) {
          return this.selected.findIndex((val) => {
            return val.value === key
          }) > -1
        }
        return false
      },
      handleSelect (data) {
        if (!this.mult) {
          this.$emit('select', {...data})
        } else {
          this.selected.push({...data})
        }
      },
      handleUnselect (data) {
        this.selected = this.selected.filters((val) => {
          return val.key !== data.key
        })
      },
      handleConfirm () {
        if (this.selected.length < 1) {
          return
        }
        this.$emit('select', this.selected)
        this.selected = []
      }
    }
  }
</script>