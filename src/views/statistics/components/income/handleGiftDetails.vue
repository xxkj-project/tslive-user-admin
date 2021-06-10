<!--
 * @Author: wangshengxian
 * @Date: 2020-10-16 11:22:26
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-10-22 14:19:56
 * @Desc: 收入明细 - 礼物流水详情
-->
<template>
  <div class="">
    <el-dialog title="" width="900px" center :visible.sync="dialogVisible" @close="handleClose">
      <div class="headerBox">
        <p class="title">礼物流水明细</p>
        <searchForm :formOptions="formOptions" @onSearch="handleSearch" />
      </div>
      <!-- 图表 -->
      <div class="dataChart">
        <div id="giftChart" :style="{ width: chartWidth }"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import searchForm from '@/components/searchForm'
import echarts from 'echarts'
import tools from '@/utils/tools'
import { getGiftDetailsList } from '@/api/statistics'
export default {
  name: '',
  data() {
    return {
      myChart: null,
      chartWidth: '100%',
      titleText: '', // 没有数据时的标题
      emptyShow: true, // 暂时标题与否
      barWidth: '20%', // 柱状图柱子的宽度
      initDate: tools.getLatelyDays(30, '{y}-{m}-{d} {h}:{i}:{s}'),
      searchData: {
        startDate: '',
        endDate: ''
      },
      infoData: {
        xAxisData: [],
        seriesData: []
      },
      yAxisConfig: {
        max: 100,
        interval: 20
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default() {
        return {}
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
    },
    formOptions() {
      // console.log("")
      return [
        {
          element: 'el-date-picker',
          label: '时间',
          prop: 'times',
          initValue: this.initDate,
          placeholder: ''
        }
      ]
    },
    giftChartOptions() {
      const { xAxisData, seriesData } = this.infoData
      const { max, interval } = this.yAxisConfig
      const options = {
        title: {
          // 标题
          text: this.titleText,
          show: this.emptyShow,
          textStyle: {
            color: '#000',
            fontSize: 16
          },
          // textAling: 'middle',
          top: '50%'
        },
        legend: {
          // 指示栏
          data: ['礼物流水明细'],
          top: 50
        },
        xAxis: [
          // x坐标系
          {
            type: 'category',
            name: '种类',
            data: xAxisData,
            nameTextStyle: {
              color: '#5094d5',
              fontSize: 16
            },
            axisPointer: {
              // 坐标轴指示器
              type: 'shadow'
              // interval: 0
            }
          }
        ],
        yAxis: [
          // y坐标系
          {
            type: 'value',
            name: '数量(个)',
            min: 0,
            max: max,
            interval: interval,
            nameTextStyle: {
              color: '#5094d5',
              fontSize: 16
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            type: 'bar',
            data: seriesData,
            barWidth: this.barWidth, // 设置柱子的宽度
            itemStyle: {
              // 柱子的配置项
              normal: {
                label: {
                  // 柱子顶部的数值设置
                  show: true, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: '#000',
                    fontSize: 16
                  }
                }
              }
            }
          }
        ]
      }
      // console.log('-options-', options)
      return tools.objectMerge(options, this.baseOptions)
    },
    baseOptions() {
      return {
        // 网格组件，坐标系中绘制网格
        grid: {
          top: 60, // 表格距离容器顶部的距离
          bottom: 10,
          containLabel: true // 坐标系的刻度标签（true:防止标签溢出的场景，false:适用于多个gird进行对其的场景）
        },
        // 标题组件，包含主标题和副标题
        title: {
          left: '50%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal'
          }
        },
        // 提示框组件
        tooltip: {
          trigger: 'axis', // 触发类型(axis常用于柱状图、折线图，item常用于饼状图、散点图)
          axisPointer: {
            // 坐标轴指示器配置项
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        // 工具栏组件
        toolbox: {
          showTitle: false,
          feature: {
            // 各个工具配置项
            dataView: { show: false, readOnly: true }, // 数据视图工具
            maginType: { show: true, type: ['line', 'bar'] }, // 动态类型切换
            restore: { show: false }, // 配置项还原
            saveAsImage: { show: false } // 保存为图片
          },
          top: 50, // 组件离容器上侧的距离
          right: '7%' // 组件离容器右侧的距离
        }
      }
    }
  },
  watch: {
    formData: {
      handler(val) {
        console.log('-watch-gift-details-formdata-', val)
        this.initDate = tools.getLatelyDays(30, '{y}-{m}-{d} {h}:{i}:{s}')
        console.log(this.initDate)
        this.searchData.startDate = this.initDate[0]
        this.searchData.endDate = this.initDate[1]
        this.getData()
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  updated() {},
  methods: {
    handleClose() {
      console.log('-close-')
    },
    initCharts() {
      let domEl = document.querySelector('#giftChart')
      this.myChart = echarts.init(domEl, 'light')
      this.myChart.resize()
      // console.log('-myChart-', myChart)
      this.myChart.showLoading('default', {
        test: '飞速加载中',
        coloe: '#409eff'
      })
      this.myChart.setOption(this.giftChartOptions)
      this.myChart.hideLoading()
    },
    handleSearch(data) {
      console.log('-data-', data)
      this.searchData.startDate = data.times ? data.times[0] : ''
      this.searchData.endDate = data.times ? data.times[1] : ''
      this.getData()
    },
    getData() {
      const params = { userId: this.formData.userId, ...this.searchData }
      console.log('-params-', params)
      getGiftDetailsList(params).then(res => {
        console.log('-res-', res)
        const list = res.data
        if (list.length > 0) {
          this.emptyShow = false
          // this.titleText = '有数据'
        } else {
          this.emptyShow = true
          this.titleText = '当前时间段没有数据！'
        }
        this.infoData = this.setAxisData(list)
        this.barWidth = this.setBarWidth(list.length)
        // let max = Math.max(...this.infoData.seriesData)
        let interval = Math.ceil(Math.max(...this.infoData.seriesData) / 5)
        this.yAxisConfig.max = interval * 5 // 设置echart图标y轴最大值
        this.yAxisConfig.interval = interval
        this.initCharts()
        console.log('-echart-data-', this.infoData)
      })
    },
    // 设置 barWidth
    setBarWidth(len) {
      let barWid = ''
      switch (len) {
        case 1:
          barWid = '20%'
          break
        case 2:
          barWid = '30%'
          break
        case 3:
          barWid = '40%'
          break
        case 4:
          barWid = '50%'
          break
        case 5:
        case 6:
          barWid = '50%'
          break
        default:
          barWid = '70%'
          break
      }
      return barWid
    },
    setAxisData(list) {
      let xAxisData = []
      let seriesData = []
      list.map(val => {
        xAxisData.push(val.giftName)
        seriesData.push(val.count)
      })
      return { xAxisData, seriesData }
    }
  },
  components: { searchForm }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.dataChart {
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 100%;
    height: 540px;
  }
}
.headerBox {
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    font-weight: 600;
    font-size: 18px;
    margin-right: 30px;
  }
}

.search-form-box {
  display: flex;
  justify-content: center;
  margin-bottom: 0;
}
</style>
