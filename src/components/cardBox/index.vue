<!--
   卡片展示组件 - cardBox
-->
<template>
  <div class="cardWrap">
    <ul class="cardBox">
      <li class="cardItem" :class="item.bgColor || 'blue'" v-for="(item, index) in list" :key="index">
        <p class="number">{{ item.number }}</p>
        <p class="txt">{{ item.txt }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    /**
     * 卡片配置
     * 示例：
     * [{
     *  number: 100, // 数值
     *  txt: '人数', // 数值说明文本
     *  bgColor: '背景色类名' // 目前有 blue、green、orange、red、*  gray 这 5 种可选，该选项为可选，默认为 blue
     * }]
     */
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {},
  components: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@blueColor: #409eff;
@greenColor: #67c23a;
@orangeColor: #e6a23c;
@redColor: #f56c6c;
@grayColor: #909399;

.cardBox {
  display: flex;
  flex-wrap: wrap;
  // padding: 10px 0;

  .cardItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 160px;
    font-size: 16px;
    color: #fff;
    border-radius: 8px;
    cursor: pointer;
    padding: 20px 0;
    margin-right: 32px;
    // margin: 0 32px 15px 0;

    &.blue {
      background: @blueColor;
    }

    &.green {
      background: @greenColor;
    }
    &.orange {
      background: @orangeColor;
    }
    &.red {
      background: @redColor;
    }
    &.gray {
      background: @grayColor;
    }

    .number {
      margin-bottom: 10px;
    }
  }
}
</style>
