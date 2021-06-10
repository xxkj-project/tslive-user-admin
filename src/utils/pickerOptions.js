/*
 * @Author: wangshengxian
 * @Date: 2020-10-13 17:48:10
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-10-22 14:25:19
 * @Desc: elementui日期时间选择快捷选项配置(单独的某一天/时间范围)
 */

/**
 * 单独的某一天快捷选择
 */
const pickerComOptions = {
  // disabledDate(time) { // 禁止选择没有到的日期
  //   return time.getTime() > Date.now()
  // },
  shortcuts: [
    {
      text: '今天',
      onClick(picker) {
        const date = new Date(new Date().toDateString())
        date.setTime(date.getTime())
        picker.$emit('pick', date)
      }
    },
    {
      text: '一周前',
      onClick(picker) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', date)
      }
    },
    {
      text: '一个月前',
      onClick(picker) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', date)
      }
    },
    {
      text: '三个月前',
      onClick(picker) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', date)
      }
    }
  ]
}

/**
 * 日期时间范围选择
 */
const pickerOptionsRange = {
  shortcuts: [
    {
      text: '今天',
      onClick(picker) {
        const end = new Date()
        const start = new Date(new Date().toDateString())
        start.setTime(start.getTime())
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近一周',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }
  ]
}

/**
 * 月份范围选择
 */
const pickerOptionsRangeMonth = {
  shortcuts: [
    {
      text: '今年至今',
      onClick(picker) {
        const end = new Date()
        const start = new Date(new Date().getFullYear(), 0)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近半年',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setMonth(start.getMonth() - 6)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近一年',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setMonth(start.getMonth() - 12)
        picker.$emit('pick', [start, end])
      }
    }
  ]
}

export default {
  pickerComOptions,
  pickerOptionsRange,
  pickerOptionsRangeMonth
}
