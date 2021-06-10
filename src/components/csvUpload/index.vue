/**
 * Created by hanxueqiang on 200116
 *
 * csv、excel文件上传按钮组件
 */
<template>
  <div class='csv-upload'>
    <el-upload
      slot="append"
      class="uploadFile"
      action="https://jsonplaceholder.typicode.com/posts/"
      :headers="headers"
      :show-file-list="false"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      :disabled="isLoading"
      :on-success="onSuccess"
      :before-upload="beforeUpload"
    >
      <el-button :loading="isLoading" v-bind="$attrs">
        <slot>导入</slot>
      </el-button>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  inheritAttrs: false,

  props: {},

  data () {
    return {
      headers: { token: getToken() },
      isLoading: false
    }
  },

  computed: {},

  created () {},

  methods: {
    // 上传开始前
    beforeUpload () {
      this.isLoading = true
    },
    // 上传完成后
    onSuccess (res) {
      this.isLoading = false
      if (res) {
        this.$emit('onSuccess', res)
      } else {
        this.$message({
          type: 'error',
          message: 'upload error'
        })
      }
    }
  },

  components: {}
}
</script>

<style lang='less' scoped>
.csv-upload {
  display: inline-block;
}
</style>
