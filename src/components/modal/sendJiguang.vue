/**
 * 发送极光消息 模态框
 */
<template>
  <div class=''>
    <el-dialog
      title="发送极光消息"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="推送消息" prop="content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6 }"
            placeholder="请输入内容"
            v-model="formData.content"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="default" @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      formData: {
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    dialogVisible: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    }
  },

  watch: {
    visible (val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.formRef.clearValidate()
        })
      }
    }
  },

  created () {},

  methods: {
    onCancel () {
      this.dialogVisible = false
    },
    onSubmit () {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          console.log('提交成功')
          this.dialogVisible = false
        }
      })
    }
  },

  components: {}
}
</script>

<style lang='less' scoped>
/deep/ .el-dialog__body {
  padding: 10px 20px;
}
/deep/ .el-dialog {
  max-width: 600px;
}
</style>
