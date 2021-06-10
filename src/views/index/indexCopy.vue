/** * 首页 */
<template>
  <div class="main-index">
    <div class="dataCard">
      <h4 class="welcome">欢迎，</h4>

      <ul>
        <li class="cardItem">
          <div class="title">近30天平均攻击力</div>
          <div class="number">1.00</div>
        </li>
        <li class="cardItem">
          <div class="title">待付款订单笔数</div>
          <div class="number">7笔</div>
        </li>
        <li class="cardItem">
          <div class="title">待发货订单笔数</div>
          <div class="number">483笔</div>
        </li>
        <li class="cardItem">
          <div class="title">待收货订单笔数</div>
          <div class="number">12笔</div>
        </li>
      </ul>
    </div>

    <!-- 图表 -->
    <div class="dataChart">
      <div id="orderChart"></div>
      <div id="userChart"></div>
    </div>
  </div>
</template>

<script>
import tools from '@/utils/tools'

import echarts from 'echarts'

export default {
  props: {},

  data() {
    return {}
  },

  computed: {
    sevenDays() {
      const arr = []
      for (let i = 6; i >= 0; i--) {
        const oneDayTime = 24 * 3600 * 1000
        const tempDate = +new Date() - oneDayTime * i
        arr.push(tools.formatDate(tempDate, '{y}-{m}-{d}'))
      }
      return arr
    },
    baseOptions() {
      return {
        grid: {
          top: 120,
          containLabel: true
        },
        title: {
          left: '50%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          showTitle: false,
          feature: {
            dataView: { show: false, readOnly: true },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: false },
            saveAsImage: { show: false }
          },
          top: 50,
          right: '7%'
        }
      }
    },
    orderChartOptions() {
      const options = {
        title: {
          // 标题
          text: '世界人口总量'
        },
        legend: {
          // 指示栏
          data: ['当日订单笔数', '当日销售金额'],
          top: 50
        },
        xAxis: [
          // x坐标系
          {
            type: 'category',
            data: this.sevenDays,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          // y坐标系
          {
            type: 'value',
            name: '笔数（单）',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '金额（元）',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          // 系列数据
          {
            name: '当日订单笔数',
            type: 'bar',
            yAxisIndex: 0,
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
          },
          {
            name: '当日销售金额',
            type: 'bar',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
          }
        ]
      }
      return tools.objectMerge(options, this.baseOptions)
    },
    userChartsOptions() {
      const options = {
        title: {
          text: '会员统计'
        },
        xAxis: [
          {
            type: 'category',
            data: this.sevenDays,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '人数（人）',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '当日用户增加数',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
          }
        ]
      }
      return tools.objectMerge(options, this.baseOptions)
    }
  },

  created() {
    console.log(this.sevenDays)
  },

  mounted() {
    this.initCharts('orderChart', this.orderChartOptions)
    this.initCharts('userChart', this.userChartsOptions)
  },

  methods: {
    initCharts(chartId, options) {
      const myChart = echarts.init(document.querySelector(`#${chartId}`), 'light')
      myChart.showLoading('default', {
        text: '飞速加载中',
        color: '#409eff'
      })
      myChart.setOption(options)
      myChart.hideLoading()
    }
  },

  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variables';

.main-index {
  display: flex;
  flex-direction: column;
}

.dataCard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 50px;

  .welcome {
    font-size: 32px;
    padding-left: 50px;
  }
  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
  }
  .cardItem {
    width: 135px;
    padding: 10px 0;
    color: #fff;
    border-radius: 5px;
    margin-right: 10px;

    .title {
      padding-bottom: 10px;
    }
    &:nth-child(1) {
      background-color: @red;
    }
    &:nth-child(2) {
      background-color: @orange;
    }
    &:nth-child(3) {
      background-color: @green;
    }
    &:nth-child(4) {
      background-color: @blue;
    }
    &:hover {
      // cursor: pointer;
      transition: transform 0.1s ease;
      transform: scale(1.1);
    }
  }
}

.dataChart {
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    width: 50%;
    height: 600px;
  }
}
</style>
