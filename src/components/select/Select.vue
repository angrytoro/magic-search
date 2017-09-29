<template>
  <div>
    <ul class="search-ul" :class="{'search-mult-ul' : ismult}">
      <Selectoption v-for="(value, key) in data" :data="{'key': key, 'value': value}" :selected="isSelected(key)" @select="handleSelect" @unselect="handleUnselect" :key="key"></Selectoption>
      <li v-if="mult" class="mult-select-btn"><button @click="handleConfirm">确认</button></li>
    </ul>
    <!-- <div v-show="mult">
      
    </div> -->
  </div>
</template>

<script>
  import Selectoption from './Option'
  export default {
    components: {
      Selectoption
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
        ismult: this.mult,
        selected: []// 多选的时候需要用到,数组里面的对象是{key: 'xxx', value: 'xxx'}
      }
    },
    watch: {
      mult (value) {
        this.ismult = value
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
        this.selected = this.selected.filter((val) => {
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