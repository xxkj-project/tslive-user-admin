<!--
 * @Author: wangshengxian
 * @Date: 2020-09-28 11:34:53
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-10-22 15:26:24
 * @Desc: 证件照查看 -- dialog
-->
<template>
  <div class="id-photo-dialog">
    <globalDialog :title="title" :isCenter="true" :isFooter="false" :dialogVis.sync="dialogVisible">
      <div class="dialogMain">
        <div class="imgBox" v-for="(imgUrl, index) in imgList" :key="index">
          <img :src="imgUrl" alt="" />
        </div>
      </div>
    </globalDialog>
  </div>
</template>

<script>
import globalDialog from '@/components/globalDialog'
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
      default: '标题'
    },
    imgList: {
      type: Array,
      default() {
        return []
      }
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
  methods: {},
  components: { globalDialog }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.imgBox {
  img {
    width: 100%;
  }
}
</style>
