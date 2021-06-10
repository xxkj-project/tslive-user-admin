<!--
 * @Author: wangshengxian
 * @Date: 2020-08-19 09:57:01
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-10-22 14:18:52
 * @Desc: el-pagination分页公共组件
-->
<template>
  <div class="pagination">
    <el-pagination
      :background="isBackground"
      :page-size.sync="computedPageSize"
      :hide-on-single-page="isSinglePageHide"
      layout="total, sizes, prev, pager, next"
      :current-page.sync="computedCurrentPage"
      :total="total"
      @current-change="currentChange"
      @size-change="sizeChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // 是否单页隐藏，默认为false
    isSinglePageHide: {
      type: Boolean,
      default: false
    },
    isBackground: {
      type: Boolean,
      default: false
    },
    // 当前页页码，支持.sync修饰符
    currentPage: {
      type: Number,
      required: true
    },
    // 每页数据条数, 支持.sync修饰符默认为每页10条
    pageSize: {
      type: Number,
      default: 10
    },
    // 数据总条数
    total: {
      type: Number,
      required: true
    }
  },

  computed: {
    computedCurrentPage: {
      get() {
        return this.currentPage
      },
      set(val) {
        this.$emit('update:currentPage', val)
      }
    },
    computedPageSize: {
      get() {
        return this.pageSize
      },
      set(val) {
        this.$emit('update:pageSize', val)
      }
    }
  },
  mounted() {},
  methods: {
    // 页面切换事件  通过 @currentChange 绑定
    currentChange(val) {
      this.$emit('currentChange', val)
    },
    // 每页条数切换事件，通过@sizeChange 绑定
    sizeChange(val) {
      this.$emit('sizeChange', val)
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  padding-top: 15px;
  text-align: center;
}
</style>
