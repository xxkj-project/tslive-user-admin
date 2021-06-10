// 登录 - api
import request from '@/utils/request'

/**
 * 登录
 */
export function login(data) {
  return request({
    url: '/admin/login/user/login',
    method: 'post',
    data
  })
}

/**
 * 退出
 */
export function logout() {
  return request({
    url: '/admin/login/logout',
    method: 'post'
  })
}

/**
 * 修改密码
 */
export function editPass(data) {
  return request({
    url: '/lms/login/modify',
    method: 'post',
    data
  })
}
