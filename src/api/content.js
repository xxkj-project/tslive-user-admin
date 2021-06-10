/**
 * 内容管理 - api
 */
import request from '@/utils/request'
// import Qs from 'qs'
/**
 * 大v相关接口 - 视频列表 ==> 获取大v短视频列表
 * @param {object} data 请求参数
 */
export function findVideoList(data) {
  return request({
    url: '/largeV/video/list',
    method: 'get',
    data
  })
}

// 添加/修改视频
const largeVApi = {
  add: '/largeV/video/add',
  edit: '/largeV/video/modify'
}

/**
 * 大v相关接口 - 添加/编辑视频 ==> 上传/编辑大V短视频
 * @param {object} data 请求参数
 * @param {string} type 操作类型 (add/edit)
 */
export function updateLargeVShortVideo(data, type) {
  return request({
    url: largeVApi[type],
    method: 'post',
    data
  })
}

/**
 * 大v相关接口 - 视频上下架操作 ==> 视频上下架
 * @param {number|string} videoId 视频id {videoId: '10009'}
 */
export function updownVideo({ videoId }) {
  return request({
    url: `/largeV/video/shelves/operation/${videoId}`,
    method: 'post'
  })
}
