<!--
   三级联动 - 动态获取数据组件
-->
<template>
  <div class="cascader">
    <el-cascader ref="cascaderRef" v-model="currValue" :options="options" :props="configObj"></el-cascader>
  </div>
</template>

<script>
import { getAreaList } from './cascaderApi'
export default {
  name: '',
  data() {
    return {
      configObj: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          console.log(level)
          // if (level >= 2) {
          //   resolve()
          //   return
          // }
          setTimeout(() => {
            resolve(getAreaList(node, 1))
          }, 1000)
        }
      }
    }
  },
  props: {
    value: {},
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    currValue: {
      get() {
        console.log('-get-', this.value)
        return this.visible
      },
      set(val) {
        console.log('-set-', val)
        this.$emit('input', val)
      }
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
