<!--
 * @Author: wangshengxian
 * @Date: 2020-08-24 11:43:59
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-08-28 14:04:53
 * @Desc: 视频上传 -- 公共组件
-->
<template>
  <div class="videoUpload">
    <ul class="videoWrap" :class="{ maxHidden: isMaxHidden }">
      <li class="item" style="width: 250px; height: 120px" v-for="(item, index) in videoList" :key="item + index">
        <video width="250" height="120" :src="videoList" controls id="videoDiv"></video>
        <i class="el-icon-delete deleteIcon" @click="onRemove(index)"></i>
      </li>

      <el-upload
        class="uploadBox"
        ref="uploadRef"
        :style="{ width: width + 'px', height: height + 'px' }"
        :action="uploadUrl"
        :headers="headers"
        :accept="videoFormat"
        :limit="limit"
        :show-file-list="false"
        :multiple="!isSingle"
        :before-upload="beforeUpload"
        :on-success="onSuccess"
        :on-error="onError"
        :on-exceed="onExceed"
        :http-request="handleHttpRequest"
      >
        <i class="el-icon-plus uploadIcon">
          <span class="uploadTxt" v-show="isUploading">正在上传...</span>
          <span class="limitTxt" v-if="!isUploading && limit && limit !== 10">最多上传{{ limit }}个</span>
        </i>
      </el-upload>
    </ul>
  </div>
</template>

<script>
import { uploadImgOrVideo } from '@/api/common'
import { getToken } from '@/utils/auth'
import { validVideoUpload } from '@/utils/validate'
import tools from '@/utils/tools'
export default {
  name: '',
  data() {
    return {
      uploadUrl: '#', // 上传地址
      headers: { token: getToken() },
      isUploading: false, // 正在上传状态
      isFirstMount: true, // 控制防止重复回显
      // 视频格式
      videoFormat:
        '.avi,.flv,.mpg,.mpeg,.mpe,.m1v,.m2v,.mpv2,.mp2v,.dat,.ts,.tp,.tpr,.pva,.pss,.mp4,.m4v,.m4p,.m4b,.3gp,.3gpp,.3g2,.3gp2,.ogg,.mov,.qt,.amr,.rm,.ram,.rmvb,.rpm'
    }
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    // 限制视频上传的大小,默认为100MB
    size: {
      type: Number,
      default: 102400
    },
    // 是否是单个上传
    isSingle: {
      type: Boolean,
      default: false
    },
    // 限制上传的数量，默认为 1
    limit: {
      type: Number,
      default: 1
    },
    httpRequest: {
      type: Function
    }
  },
  computed: {
    videoList: {
      get() {
        // console.log('-get-video-', this.value)
        return this.value
      },
      set(val) {
        // console.log('-set-video-', val)
        if (val.length < this.videoList.length) {
          // 判断式删除图片时同步el-upload数据
          this.syncVideoList(val)
        }
        // 同步v-model
        this.$emit('input', val)
      }
    },
    // 达到最大上传限制隐藏上传按钮
    isMaxHidden() {
      return this.videoList.length >= this.limit
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        // console.log('-watch-video-value-', newVal)
        if (this.isFirstMount && this.value.length > 0) {
          this.syncVideoList()
        }
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    if (this.value.length > 0) {
      this.syncVideoList()
    }
  },
  methods: {
    getVideoEl(callback) {
      this.$nextTick(() => {
        let el = document.getElementById('videoDiv')
        callback(el)
      })
    },
    // 同步 videoList
    syncVideoList(val) {
      const videoList = val || this.videoList
      // console.log('-sync-video-list-', videoList)
      this.$refs.uploadRef.uploadFiles = videoList.map((v, i) => {
        return {
          name: 'pic' + i,
          url: v,
          status: 'success',
          uid: tools.createUniqueString()
        }
      })
      this.isFirstMount = false
    },
    // TODO:上传完单个视频，当通过自定义上传时，该回调不会被触发
    onSuccess(res, file, fileList) {
      // console.log('-success-upload-video-', res, file, fileList)
      if (res.files) {
        if (this.videoList.length < this.limit) {
          // this.videoList.push(res.files.file)
          this.videoList = [...this.videoList, res.files.file]
        }
      } else {
        this.syncVideoList()
        this.$message({ type: 'error', message: res.msg })
      }
      this.isUploading = false
    },
    onError(err, file, fileList) {
      console.log(err, file, fileList)
    },
    // 超限
    onExceed(file, fileList) {
      console.log(file, fileList)
      this.$refs.uploadRef.abort()
      this.syncVideoList()
      this.$message({ type: 'warning', message: `视频超限，最多可上传${this.limit}个视频` })
    },
    // 上传之前
    beforeUpload(file) {
      this.isFirstMount = false
      // 验证上传视频资源是否过大
      if (validVideoUpload(file, this.size)) {
        this.isUploading = true
        console.log('正在上传...')
        return true
      } else {
        console.log('视频资源过大。。。')
        return false
      }
    },
    // 自定义上传
    handleHttpRequest(a) {
      // console.log('-video-http-request-', a)
      if (this.httpRequest) {
        // 重新定义上传
        this.httpRequest(a)
        return
      }
      const formData = new FormData()
      formData.append('pics', a.file)
      uploadImgOrVideo(formData)
        .then(res => {
          if (res.code === 200) {
            // console.log('-res-', res)
            this.$message({ type: 'success', message: '上传成功！' })
            // TODO: push操作不能触发计算属性中videoList的et方法
            const picUrl = res.data[0].picUrl
            // this.videoList.push(picUrl)
            this.videoList = [...this.videoList, picUrl]
            this.isUploading = false
            this.$emit('success', this.videoList)
          }
        })
        .catch(err => {
          // TODO 上传失败后需要同步 fileList,否则再次上传同一张图片会出现占位bug
          console.log('__ERROR__', err)
          this.$message({ type: 'error', message: err.msg })
          this.isUploading = false
          this.syncVideoList()
        })
    },
    onRemove(index) {
      // console.log(this.$refs.uploadRef.uploadFiles)
      this.$confirm('确定删除该视频?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.videoList = this.videoList.filter((v, i) => {
            return i !== index
          })
        })
        .catch(() => {})
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
/deep/ .el-upload {
  width: 100%;
  height: 100%;
}
.videoWrap {
  display: flex;
  flex-wrap: wrap;

  .item {
    position: relative;
    margin: 0 10px 10px 0;

    .deleteIcon {
      position: absolute;
      right: 7px;
      top: 7px;
      color: white;
      background: gray;
      padding: 5px;
    }
  }
  &.maxHidden {
    .uploadBox {
      display: none;
    }
  }
}

.uploadBox {
  .uploadIcon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1px dashed #c0ccda;
    background: #fdfbff;
    border-radius: 6px;
    font-size: 20px;
    color: #999;

    .uploadTxt,
    .limitTxt {
      position: absolute;
      left: 0;
      bottom: 10%;
      width: 100%;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
