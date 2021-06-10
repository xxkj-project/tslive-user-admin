/**
 * 公共工具函数
 */

/**
 * 日期时间格式化
 * @param {date} time js的date类型或时间戳
 * @param {string} format 自定义时间格式，选填，默认为'{y}-{m}-{d} {h}:{i}:{s}'
 * @return {string} 默认格式 2018-09-01 10:55:00
 */
function formatDate(time, format) {
  time = time || new Date()
  format = format || '{y}-{m}-{d} {h}:{i}:{s}'
  let date = time
  if (typeof time !== 'object') {
    if (('' + time).length === 10) time = +time * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * 日期格式转时间戳
 * @param {date} date date类型 2019-05-24 14:22:17
 * @return {string} 1558678937000
 */
function getTimestamp(date) {
  if (!date) {
    return new Date().getTime()
  }
  if (typeof date === 'string') {
    date = date.replace(/-/g, '/')
  }
  return new Date(date).getTime()
}

/**
 * 日期格式转换成和当前时间相比剩余天数
 * @param {date} startDate 开始时间点 startDate类型 2020-08-26 10:48:36，该参数不存在时，开始时间点为当前时间
 * @param {date} endDate 结束时间点 endDate类型 2020-08-26 10:57:36
 * @return {string} number 数字n
 */
function getRemainDay(endDate, startDate) {
  if (typeof endDate === 'string') {
    // "-" 移动端ios部分机型不识别，需要转化
    endDate = endDate.replace(/-/g, '/')
  }
  if (startDate && typeof startDate === 'string') {
    // "-" 移动端ios部分机型不识别，需要转化
    startDate = startDate.replace(/-/g, '/')
  }
  let curr = startDate ? new Date(startDate).getTime() : new Date().getTime()
  // console.log(endDate)
  let end = new Date(endDate).getTime()
  // console.log('-end-', end, '-curr-', curr)
  let cha = Math.ceil((end - curr) / 1000 / 3600 / 24)
  return cha
}

/**
 * 获取7天前的 00:00:00 至当天的前一天 23:59:59
 * 例如: 2020-10-14 11:01:36 ==> ["2020-10-07 00:00:00","2020-10-13 23:59:59"]
 * @return {array}  ["2020-10-07 00:00:00","2020-10-13 23:59:59"]
 */
function getWeekAgo() {
  let currTs = new Date(new Date().toLocaleDateString()).getTime()
  // console.log('-curr-', currTs)
  let startTime = formatDate(currTs - 24 * 60 * 60 * 7 * 1000)
  let endTime = formatDate(currTs - 1000)
  return [startTime, endTime]
}

/**
 * 最近多少天
 * @param {number} days 默认30天
 * @param {string} format 自定义时间类型，默认 '{y}-{m}-{d}', '{y}-{m}-{d} {h}:{i}:{s}'
 * @return {array} ['2020-10-01','2020-10-14']
 */
function getLatelyDays(days, format) {
  days = days || 30
  format = format || '{y}-{m}-{d}'
  // let currTs = new Date(new Date().toLocaleDateString()).getTime()
  let currTs = getTimestamp(formatDate(new Date(), format))
  let startTime = formatDate(currTs - 24 * 60 * 60 * days * 1000, format)
  let endTime = formatDate(currTs, format)
  // console.log(startTime, endTime)
  return [startTime, endTime]
}

/**
 * 日期时间文字化
 * 比较传入时间与当前本地时间，文字化显示日期时间
 * @param {date} time js的date类型或时间戳
 * @param {string} cFormat 自定义两天前的时间格式，选填
 * @return {string} 刚刚 n分钟前 n小时前 1天前
 */
function txtFormatTime(time, format) {
  if (!time) {
    return 'null'
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  } else {
    return formatDate(time, format)
  }
}

/**
 * 对象参数序列化
 * @param {object} obj 对象参数
 * @return {string} a=1&b=2&c=3
 */
function objToUrlParams(obj) {
  let str = ''
  Object.keys(obj).forEach(v => {
    if (obj[v] !== undefined) {
      str += `${encodeURIComponent(v)}=${encodeURIComponent(obj[v])}&`
    }
  })
  return str.slice(0, -1)
}

/**
 * 获取地址参数
 * @param {string} url 指定地址，默认取当前页地址
 * @return {string} { a: 1, b: 2, c: 3 }
 */
function getQueryObject(url) {
  url = url || window.location.href
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * 创建唯一的字符串
 * @return {string} ojgdvbvaua40
 */
function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * 文件下载
 * @param {string} url 文件下载链接url，带上接口参数
 * @param {string} name 前端自定义的下载文件名，带上文件后缀名，选填
 * chrome会优先使用接口返回的命名，edge会优先使用此name
 */
function downloadFile(url, name) {
  url = url || ''
  name = name || ''
  const ele = document.createElement('a')
  ele.target = '_blank'
  ele.href = url
  ele.download = name
  document.body.appendChild(ele)
  ele.click()
  document.body.removeChild(ele)
}

/**
 * 获取字符串的字节长度
 * @param {String} str 字符串
 * @returns {number} 字节长度
 */
function getByteLength(str) {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line
    if (str[i].match(/[^\x00-\xff]/gi) != null) {
      len += 2
    } else {
      len += 1
    }
  }
  return len
}

/**
 * 数字千分化
 * @param {number} num 数字
 * @return {number} 10,000
 */
function toThousands(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 数字存储大小格式化
 * @param {number} num 存储大小 单位：Byte
 * @param {number} digits 保留几位小数
 * @return {string} 2MB
 */
function toStorage(num, digits) {
  digits = digits || 2
  if (num < 1024) {
    return num + 'B'
  }
  console.log('num', num)
  num = (num * 1000) / 1024
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      // console.log(num / si[i].value / 1.024)
      return (
        (num / (si[i].value * 1.024)).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol + 'B'
      )
    }
  }
}

/**
 * 函数防抖
 * @param {function} fn 函数
 * @param {number} t 等待时间（毫秒）
 * @return {function}
 */
function debounce(fn, t) {
  let timeId
  let delay = t || 500
  return function() {
    let args = arguments
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      timeId = null
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 函数节流
 * @param {function} fn 函数
 * @param {number} t 间隔时间（毫秒）
 * @return {function}
 */
function throttle(fn, t) {
  let timeId
  let firstTime = true
  let interval = t || 500
  return function() {
    let args = arguments
    if (firstTime) {
      fn.apply(this, args)
      firstTime = false
      return
    }
    if (timeId) {
      return
    }
    timeId = setTimeout(() => {
      clearTimeout(timeId)
      timeId = null
      fn.apply(this, args)
    }, interval)
  }
}

/**
 * 深克隆
 * @param {object|array} 源数据
 * @return {object|array}
 */
function deepClone(source) {
  return JSON.parse(JSON.stringify(source))
}

/**
 * 获取数据类型
 * @param {any} data 数据
 * @return {string} 'array'
 */
function getDataType(data) {
  const str = Object.prototype.toString.call(data)
  return str.match(/\s(\w*)\]/)[1].toLowerCase()
}

/**
 * 对象合并 (对象属性深度合并，其他属性覆盖更新(a覆盖b))
 * @param {object} a 对象
 * @param {object} b 对象
 * @return {object} 合并后的对象 (新)
 */
function objectMerge(a, b) {
  let obj = JSON.parse(JSON.stringify(a))
  return (function merge(target, source) {
    if (typeof target !== 'object') {
      target = {}
    }
    if (Array.isArray(source)) {
      return source.slice()
    }
    Object.keys(source).forEach(property => {
      const sourceProperty = source[property]
      if (typeof sourceProperty === 'object') {
        target[property] = merge(target[property], sourceProperty)
      } else {
        target[property] = sourceProperty
      }
    })
    return target
  })(obj, b)
}

/**
 * 获取日期范围内的所有日期项
 * @param {string} type 'day'按天 'month'按月
 * @param {array} range 日期范围，第一项为开始日期，第二项为结束日期（可选，不传时默认30天或者12个月）
 * @return {array} 该范围内的所有日期项数组
 */
function getDateRangeItems(type, range) {
  let arr = []
  let start, end, times
  if (type === 'day') {
    // 按天
    if (!range || range.length === 0) {
      start = new Date()
      end = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 29)
    } else {
      start = new Date(range[0])
      end = new Date(range[1])
    }
    times = (end.getFullYear() - start.getFullYear() + 1) * 366
    for (let i = 0; i < times; i++) {
      arr.push(formatDate(start, '{y}-{m}-{d}'))
      if (formatDate(start, '{y}-{m}-{d}') === formatDate(end, '{y}-{m}-{d}')) {
        break
      }
      start.setTime(start.getTime() + 3600 * 1000 * 24)
    }
  } else if (type === 'month') {
    // 按月
    if (!range || range.length === 0) {
      start = new Date()
      end = new Date()
      start.setMonth(start.getMonth() - 11)
    } else {
      start = new Date(range[0])
      end = new Date(range[1])
    }
    times = (end.getFullYear() - start.getFullYear() + 1) * 12
    for (let i = 0; i < times; i++) {
      arr.push(formatDate(start, '{y}-{m}'))
      if (formatDate(start, '{y}-{m}') === formatDate(end, '{y}-{m}')) {
        break
      }
      start.setMonth(start.getMonth() + 1)
    }
  }
  return arr
}

/**
 * url域名过滤
 */
function domainFilter(url) {
  return url.replace(/^https?:\/\/[^/]+/, '')
}

export default {
  // 日期时间格式化
  formatDate,
  // 日期格式转时间戳
  getTimestamp,
  // 日期格式转化成剩余时间n天
  getRemainDay,
  // 日期时间文字化
  txtFormatTime,
  // 对象参数序列化
  objToUrlParams,
  // 获取地址参数
  getQueryObject,
  // 创建唯一的字符串
  createUniqueString,
  // 文件下载
  downloadFile,
  // 获取字符串的字节长度
  getByteLength,
  // 数字千分化
  toThousands,
  // 数字存储大小格式化
  toStorage,
  // 函数防抖
  debounce,
  // 函数节流
  throttle,
  // 深克隆
  deepClone,
  // 获取数据类型
  getDataType,
  // 对象合并
  objectMerge,
  // 获取日期范围内的所有日期项
  getDateRangeItems,
  // 获取一周前零点至今天的前一天23:59:59
  getWeekAgo,
  // 获取最近n天
  getLatelyDays,
  // 域名过滤
  domainFilter
}
