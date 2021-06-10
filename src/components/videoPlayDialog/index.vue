<!--
 * @Author: wangshengxian
 * @Date: 2020-08-19 11:35:41
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-08-20 13:58:02
 * @Desc: 全局视频播放dialog
-->
<template>
  <div class="dialogWrap">
    <el-dialog :center="true" :title="title" :visible.sync="dialogVis" :width="width" @closed="onCloseEvent">
      <div class="videoWrap">
        <videoItem
          v-bind="$attrs"
          v-on="$listeners"
          :autoPlay="isAutoPlay"
          :playStatus="dialogVis"
          :onPlay="handlePlay"
          :onPause="handlePause"
          :onEnd="handleEnd"
        ></videoItem>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import videoItem from './videoItem'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    // dialog的显示/隐藏
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // dialog宽度
    width: {
      type: String,
      default: '50%'
    },
    // dialog标题
    title: {
      type: String,
      default: ''
    },
    // 是否自动播放
    isAutoPlay: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    dialogVis: {
      get() {
        return this.dialogVisible
      },
      set(val) {
        this.$emit('update:dialogVisible', false)
      }
    }
  },
  created() {},
  mounted() {},
  watch: {
    dialogVisible(newVal, oldVal) {
      // console.log('-watch-video-dialog-', newVal)
    }
  },
  methods: {
    onCloseEvent() {
      console.log('-close-dialog-')
    },
    handlePlay(e) {
      console.log('自定义播放回调事件', e)
    },
    handlePause(e) {
      console.log('自定义暂停回调事件', e)
    },
    handleEnd(e) {
      console.log('自定义播放结束回调事件')
    }
  },
  components: { videoItem }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
