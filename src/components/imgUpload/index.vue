/**图片上传 公共组件 */
<template>
  <div class="uploadWrapper">
    <vuedraggable
      class="vue-draggable"
      :class="{ single: isSingle, maxHidden: isMaxHidden }"
      v-model="imgList"
      tag="ul"
      draggable=".draggable-item"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <!-- 拖拽元素 -->
      <li
        v-for="(item, index) in imgList"
        :key="item + index"
        class="draggable-item"
        :style="{ width: width + 'px', height: height + 'px' }"
      >
        <el-image :src="item" :preview-src-list="[item]"></el-image>
        <div class="shadow" @click="onRemoveHandler(index)">
          <i class="el-icon-delete"></i>
        </div>
      </li>
      <!-- 上传按钮 -->
      <el-upload
        slot="footer"
        ref="uploadRef"
        class="uploadBox"
        :style="{ width: width + 'px', height: height + 'px' }"
        :action="uploadUrl"
        :headers="headers"
        accept=".jpg,.jpeg,.png,.gif"
        :show-file-list="false"
        :multiple="!isSingle"
        :limit="limit"
        :before-upload="beforeUpload"
        :on-success="onSuccessUpload"
        :on-error="onError"
        :on-exceed="onExceed"
        :http-request="handleHttpRequest"
      >
        <i class="el-icon-plus uploadIcon">
          <span class="uploading" v-show="isUploading">正在上传...</span>
          <span v-if="!isUploading && limit && limit !== 99 && !isSingle" class="limitTxt">最多{{ limit }}张</span>
        </i>
      </el-upload>
    </vuedraggable>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable'
import { getToken } from '@/utils/auth'
import { validImgUpload } from '@/utils/validate'
import lrz from 'lrz'
import tools from '@/utils/tools'
import { uploadImgOrVideo } from '@/api/common'
export default {
  name: 'ImgUpload',

  props: {
    // 图片数据(图片url组成的数组) 通过v-model传递
    value: {
      type: Array,
      default() {
        return []
      }
    },
    // 限制上传的图片数量
    limit: {
      type: Number,
      default: 99
    },
    // 限制上传图片的文件大小(kb)
    size: {
      type: Number,
      default: 500
    },
    // 是否是单图上传(单图上传就是已传图片和上传按钮重叠)
    isSingle: {
      type: Boolean,
      default: false
    },
    // 是否使用图片压缩
    useCompress: {
      type: Boolean,
      default: false
    },
    // 图片显示的宽度(px)
    width: {
      type: Number,
      default: 100
    },
    // 图片显示的高度(px)
    height: {
      type: Number,
      default: 100
    },
    httpRequest: {
      type: Function
    }
  },

  data() {
    return {
      headers: { token: getToken() },
      // headers: { 'content-type': 'application/json; charset=utf-8' },
      // uploadUrl: 'http://twww.tangseng.io:8604/livecms/admin/upload/uploadPic', // 上传地址
      uploadUrl: 'https://httpbin.org/post', // 上传地址
      isUploading: false, // 正在上传状态
      isFirstMount: true // 控制防止重复回显
    }
  },

  computed: {
    // 图片数组数据
    imgList: {
      get() {
        // console.log('-get-', this.value)
        return this.value
      },
      set(val) {
        // console.log('-set-', val)
        if (val.length < this.imgList.length) {
          // 判断是删除图片时同步el-upload数据
          this.syncElUpload(val)
        }
        // 同步v-model
        this.$emit('input', val)
      }
    },
    // 控制达到最大限制时隐藏上传按钮
    isMaxHidden() {
      // console.log('-isMaxHidden-', this.imgList.length, this.limit)
      return this.imgList.length >= this.limit
    }
  },

  watch: {
    value: {
      handler(val) {
        // console.log('-img-upload-', this.value, this.isFirstMount)
        if (this.isFirstMount && this.value.length > 0) {
          this.syncElUpload()
        }
      },
      deep: true
    }
  },

  mounted() {
    if (this.value.length > 0) {
      this.syncElUpload()
    }
  },

  methods: {
    // 同步el-upload数据
    syncElUpload(val) {
      const imgList = val || this.imgList
      // console.log('111', '-img-list-', imgList)
      this.$refs.uploadRef.uploadFiles = imgList.map((v, i) => {
        // console.log(v)
        return {
          name: 'pic' + i,
          url: v,
          status: 'success',
          uid: tools.createUniqueString()
        }
      })
      this.isFirstMount = false
    },
    handleHttpRequest(a) {
      // console.log('-handle-http-request-', a, a.file)
      const formData = new FormData()
      formData.append('pics', a.file)
      uploadImgOrVideo(formData)
        .then(res => {
          // console.log('-res-', res)
          if (res.code === 200) {
            this.$message({ type: 'success', message: '上传成功！' })
            // TODO: push操作不能触发计算属性中imgList的set方法
            const picUrl = res.data[0].picUrl
            // this.imgList.push(picUrl)
            this.imgList = [...this.imgList, picUrl]
            this.isUploading = false
            this.$emit('success', this.imgList)
          }
        })
        .catch(err => {
          // TODO: 上传失败后需要同步 fileList,否则再次上传同一张图片会出现占位bug
          console.log('__ERROR__', err)
          this.$message({ type: 'error', message: err.msg })
          this.isUploading = false
          this.syncElUpload()
        })
    },
    // 上传图片之前
    beforeUpload(file) {
      this.isFirstMount = false
      if (this.useCompress) {
        // 图片压缩
        return new Promise((resolve, reject) => {
          lrz(file, { width: 1920 })
            .then(rst => {
              file = rst.file
            })
            .always(() => {
              if (validImgUpload(file, this.size)) {
                this.isUploading = true
                console.log('正在上传。。。')
                resolve()
              } else {
                reject(new Error())
              }
            })
          // console.log('-before-upload--', 111, '压缩图片')
        })
      } else {
        // console.log('-before-upload--', 111, '不压缩图片')
        if (validImgUpload(file, this.size)) {
          this.isUploading = true
          console.log('正在上传。。。')
          return true
        } else {
          return false
        }
      }
    },
    // 上传完单张图片
    onSuccessUpload(res, file, fileList) {
      // console.log('-upload-success-')
      if (res.files) {
        if (this.imgList.length < this.limit) {
          // this.imgList.push(res.files.file)
          this.imgList = [...this.imgList, res.files.file]
        }
      } else {
        this.syncElUpload()
        this.$message({ type: 'error', message: res.msg })
      }
      this.isUploading = false
    },
    // 移除单张图片
    onRemoveHandler(index) {
      this.$confirm('确定删除该图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.imgList = this.imgList.filter((v, i) => {
            return i !== index
          })
        })
        .catch(() => {})
    },
    // 超限
    onExceed(file, fileList) {
      console.log('超限', file, fileList)
      this.$refs.uploadRef.abort() // 取消剩余接口请求
      this.syncElUpload()
      this.$message({
        type: 'warning',
        message: `图片超限，最多可上传${this.limit}张图片`
      })
    },
    // 上传失败
    onError(err, file, fileList) {
      console.log(err, file, fileList)
    },
    onDragStart(e) {
      e.target.classList.add('hideShadow')
    },
    onDragEnd(e) {
      e.target.classList.remove('hideShadow')
    }
  },

  components: { vuedraggable }
}
</script>

<style lang="less" scoped>
/deep/ .el-upload {
  width: 100%;
  height: 100%;
}

// 上传按钮
.uploadIcon {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #c0ccda;
  background-color: #fbfdff;
  border-radius: 6px;
  font-size: 20px;
  color: #999;

  .limitTxt,
  .uploading {
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 100%;
    font-size: 14px;
    text-align: center;
  }
}

// 拖拽
.vue-draggable {
  display: flex;
  flex-wrap: wrap;

  .draggable-item {
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    position: relative;
    overflow: hidden;

    .el-image {
      width: 100%;
      height: 100%;
    }
    .shadow {
      position: absolute;
      top: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;
      color: #fff;
      font-size: 20px;
      line-height: 20px;
      padding: 2px;
      cursor: pointer;
    }
    &:hover {
      .shadow {
        opacity: 1;
      }
    }
  }
  &.hideShadow {
    .shadow {
      display: none;
    }
  }
  &.single {
    overflow: hidden;
    position: relative;

    .draggable-item {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }
  }
  &.maxHidden {
    .uploadBox {
      display: none;
    }
  }
}
</style>
