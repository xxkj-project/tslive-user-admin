<!--
  首页
-->
<template>
  <div class="main-index">
    <div class="dataCard">
      <h4 class="welcome">欢迎您，{{ userName }} 用户</h4>
      <!-- <cardBox :list="infoList" /> -->
    </div>
    <!-- <div class="mainWrap">
      <cascader v-model="cascaderVal" :options="cascaderList" />
    </div> -->
  </div>
</template>

<script>
import { getUsername } from '@/utils/auth'
// import cardBox from '@/components/cardBox'
// import cascader from '@/components/cascader'
export default {
  props: {},

  data() {
    return {
      userName: getUsername() || '',
      infoList: [
        { txt: '在线人数1', number: 11 },
        { txt: '在线人数3', number: 33, bgColor: 'green' },
        { txt: '在线人数4', number: 44, bgColor: 'orange' },
        { txt: '在线人数5', number: 55, bgColor: 'red' },
        { txt: '在线人数6', number: 66, bgColor: 'gray' }
      ],
      cascaderVal: '',
      cascaderList: []
    }
  },
  computed: {},
  created() {
    // this.getData()
  },
  mounted() {},
  methods: {
    getData() {
      let list = [
        { value: '1', label: '分类1', leaf: false, children: [] },
        { value: '2', label: '分类2', leaf: false, children: [] }
      ]
      this.cascaderVal = ['1', '11']
      this.cascaderList = list
    }
  },

  components: {}
  // components: { cardBox, cascader },
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variables';

.main-index {
  display: flex;
  flex-direction: column;

  .dataCard {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 50px;

    .welcome {
      font-size: 32px;
    }
  }
}
</style>
