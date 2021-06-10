/**
 * 网宿上传大文件
 */

import * as wsObj from 'wcs-js-sdk'
import { wcsUploadUrl } from '@/const/global'
import { getWsUploadToken } from '@/api/common'

/**
 * 网宿上传配置信息
 */
const extraConfig = {
  timeout: 10 * 60 * 1000, // 超时时间, 默认为0 超时错误可以重试上传
  concurrentRequestLimit: 3, // 并发数,默认为3。注：浏览器对连接的请求资源是有限的, 比如Chrome的请求资源是6, 所以会有这样的情况, 如果并发数写10, 虽然发起了10个请求, 但是只有6个真正在上传
  retryCount: 0 // 上传重试, 默认为0
}

/**
 * 创建上传大文件实例
 * @param {string} file 要上传的文件
 * @param {string} token 后台服务器获取的token
 */
function createWcsUploadObj(file, token) {
  return wsObj.wcsUpload(file, token, wcsUploadUrl, extraConfig)
}

/**
 * 上传大文件
 * @param {string} file 需要上传的文件
 * @return {object} 返回上传文件实例
 */
const largeFileUpload = async function(file) {
  const params = { fileName: file.name }
  const res = await getWsUploadToken(params)
  // console.log('-res-', res)
  const { fileName, token } = res.data
  const copyFile = new File([file], fileName) // 更改file.name,此处不可直接修改name
  // 上传实例
  const uploadObj = createWcsUploadObj(copyFile, token)
  uploadObj.putFile()
  return uploadObj
}

export default largeFileUpload
