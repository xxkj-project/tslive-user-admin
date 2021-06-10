<!--
 * @Author: wangshengxian
 * @Date: 2020-09-28 11:45:53
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-10-22 15:25:54
 * @Desc: 全局公共的dialog
-->
<template>
  <div class="dialogWrap">
    <el-dialog
      class="el_dialog"
      :title="title"
      :width="width"
      :top="top"
      :center="isCenter"
      :fullscreen="isFullScreen"
      :close-on-click-modal="isModalClose"
      :close-on-press-escape="isEscClose"
      :visible.sync="dialogVisible"
      :before-close="handleBeforeClose"
      @opened="handleOpened"
      @closed="handleClosed"
    >
      <div class="slotWrap">
        <slot />
      </div>
      <div class="dialog-footer" slot="footer" v-if="isFooter">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onConfirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    dialogVis: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: '350px'
    },
    // dialog margin-top值，默认为15vh
    top: {
      type: String,
      default: '15vh'
    },
    // 头部和底部是否采用居中布局,默认为false
    isCenter: {
      type: Boolean,
      default: false
    },
    // 是否为全屏dialog,默认为false
    isFullScreen: {
      type: Boolean,
      default: false
    },
    // 是否可以通过点击modal关闭dialog,默认为true
    isModalClose: {
      type: Boolean,
      default: true
    },
    // 是否可以同通过按下ESC关闭dialog,默认为true
    isEscClose: {
      type: Boolean,
      default: true
    },
    // 是否显示底部按钮，默认为true
    isFooter: {
      type: Boolean,
      default: true
    },
    // 自定义confirm函数
    confirmEvent: {
      type: Function
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.dialogVis
      },
      set(val) {
        this.$emit('update:dialogVis', val)
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleBeforeClose(done) {
      // console.log('dialog关闭前的回调')
      done()
    },
    handleOpened() {
      // console.log('dialog打开动画结束时的回调')
    },
    handleClosed() {
      // console.log('dialog关闭动画结束时的回调')
    },
    onConfirm() {
      if (this.confirmEvent) {
        console.log('自定义confirm')
        this.confirmEvent()
        return
      }
      this.dialogVisible = false
    },
    onCancel() {
      this.dialogVisible = false
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
