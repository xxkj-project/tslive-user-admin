import request from '@/utils/request'
import Qs from 'qs'

/**
 * 获取收入明细list
 */
export function getIncomeList(data) {
  return request({
    url: `/lms/guildAnchor/incomeList?${Qs.stringify(data)}`,
    method: 'get',
    data: {}
  })
}

/**
 * 获取礼物流水明细(单个用户)
 */
export function getGiftDetailsList(data) {
  return request({
    url: `/lms/guildAnchor/incomeDetail?${Qs.stringify(data)}`,
    method: 'get',
    data: {}
  })
}
