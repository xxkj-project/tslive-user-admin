<!--
  审核不通过 - 全局dialog
-->
<template>
  <div class="dialog">
    <el-dialog title="审核不通过原因" width="800px" :visible.sync="dialogVisible" @close="handleClose">
      <el-form ref="formRef" label-width="200px">
        <el-form-item label="选择模板">
          <el-select v-model="tempTxt" clearable placeholder="全部">
            <el-option v-for="item in reasonList" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自定义">
          <el-input v-model="diyTxt" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>

      <div class="dialog-footer" slot="footer">
        <el-button type="primary" :loading="isLoading" @click="onConfirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      tempTxt: '',
      diyTxt: ''
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    reasonList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.tempTxt = ''
      this.diyTxt = ''
    },
    onConfirm() {
      this.validateFunc(() => {
        let content = this.diyTxt || this.tempTxt
        this.$emit('success', content)
      })
    },
    validateFunc(callback) {
      // console.log(this.tempTxt, this.diyTxt)
      if (!this.tempTxt && !this.diyTxt) {
        this.msgFunc('不通过原因不能为空！')
        return
      }
      if (this.tempTxt && this.diyTxt) {
        this.msgFunc('不通过原因，模板和自定义只能选一个！')
        return
      }
      callback()
    },
    msgFunc(message, type = 'warning') {
      this.$message({
        message,
        type
      })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.el-textarea {
  width: 360px;
}
</style>
