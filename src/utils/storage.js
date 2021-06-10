/**
 * localStorage封装 (支持过期时间)
 */
import tools from './tools'

/**
 * 设置item
 * @param {string} key 键名
 * @param {any} value 键值
 * @param {number} hours 存储时间 (小时) (可选)
 */
function setItem(key, value, hours) {
  if (hours !== undefined && typeof hours === 'number') {
    const expire = tools.formatDate(new Date().getTime() + hours * 3600 * 1000)
    value = { value, expire }
  }
  if (tools.getDataType(value) === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

// 获取item
function getItem(key) {
  let data = localStorage.getItem(key)
  // TODO: 字符串调用 JSON.parse() 会报错，走 catch ，纯数字类型的字符串通过调用 JSON.parse() 类型会转化成 Number类型
  try {
    data = JSON.parse(data)
  } catch (err) {
    return data
  }
  if (tools.getDataType(data) === 'object' && data.expire) {
    if (tools.getTimestamp() < tools.getTimestamp(data.expire)) {
      return data.value
    } else {
      return null
    }
  } else {
    return data
  }
}

// 移除item
function removeItem(key) {
  localStorage.removeItem(key)
}

export default {
  getItem,
  setItem,
  removeItem
}
