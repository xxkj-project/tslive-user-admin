/**
 * 验证器
 */
import { Message } from 'element-ui'
import tools from './tools'

/**
 * @param {string} path
 * @returns {boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 用户名验证
 * @param {string} str
 * @returns {boolean}
 */
export function validUsername(str) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}

/**
 * url验证
 * @param {string} url
 * @returns {boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * // 验证字母小写
 * @param {string} str
 * @returns {boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * 验证字母大写
 * @param {string} str
 * @returns {boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * 验证是否为数字
 * @param {string | number} str
 * @returns {boolean}
 */
export function validNumber(str) {
  const reg = /^[0-9]+$/
  return reg.test(str)
}

/**
 * 验证是否为字母
 * @param {string} str
 * @returns {boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * 验证是否数字字母
 * @param {string} str
 * @returns {boolean}
 */
export function validNumberAlphabet(str) {
  const reg = /^[A-Za-z0-9]*$/
  return reg.test(str)
}

/**
 * 验证图片上传文件大小
 * @param {File} file el-upload文件对象
 * @param {number} size 限制的文件大小(kb) 默认10M
 */
export const validImgUpload = (file, size) => {
  size = +size || 10240
  const isSizeOut = file.size / 1024 > size
  if (isSizeOut) {
    Message.error('上传图片大小不能超过' + tools.toStorage(size * 1024))
  }
  return !isSizeOut
}

/**
 * 验证视频上传文件大小
 * @param {File} file el-upload文件对象
 * @param {number} size 限制的文件大小(kb) 默认200M
 */
export const validVideoUpload = (file, size) => {
  console.log(file, size)
  size = +size || 204800
  const isSizeOut = file.size / 1024 > size
  if (isSizeOut) {
    Message.error('上传视频大小不能超过' + tools.toStorage(size * 1024))
  }
  return !isSizeOut
}

/**
 * 手机号验证，只验证位数
 * @param {string} 手机号码
 * @returns {boolean}
 */
export function validCellphone(str) {
  const reg = /^[0-9]{11}$/
  // const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
  return reg.test(str)
}

/**
 * 邮箱验证
 * @param {string} email
 * @returns {boolean}
 */
export function validEmail(email) {
  // eslint-disable-next-line
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

// /**
//  * 验证密码必须为 8-64位字母、数字、特殊符号组成
//  * @param {String} str
//  * @returns {boolean}
//  */
// export function validPwd(str) {
//   const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,64}$/
//   return reg.test(str)
// }

/**
 * 身份证验证(只验证身份证位数)
 * @param {string} idCard
 * @returns {boolean}
 */
export function validIdCardSimple(idCard) {
  // 15位、18位、结尾为 X/x
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(idCard)
}

/**
 * 身份证验证(验证身份证真伪)
 * @param {string} idNumber
 * @returns {boolean}
 */
export function validIdCard(idNumber) {
  var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9xX]$/
  if (!p.test(idNumber)) {
    // 验证位数
    console.log('位数不对')
    return false
  } else if (p.test(idNumber)) {
    var istst = idNumber.split('')
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    var parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    var sum = 0
    var ai = 0
    var wi = 0
    for (var i = 0; i < 17; i++) {
      ai = istst[i]
      wi = factor[i]
      sum += ai * wi
    }
    if (parity[sum % 11].toString() !== istst[17]) {
      // 验证真伪
      return false
    } else {
      return true
    }
  }
}

/**
 * 护照验证
 * @param {number} code 护照证件码
 * @returns {boolean}
 */
export function validPassport(code) {
  const reg = /^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/
  return reg.test(code)
}
