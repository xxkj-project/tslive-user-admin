// 字段转中文 - 全局
/**
 * 传v时返回匹配的label(用于转换中文)，
 * 不传v时返回data数组(用于el-select等数据)
 */
const getData = (data, v) => {
  if (v === undefined) {
    return data
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].value === v) {
        return data[i].label
      }
    }
  }
}

/**
 * 证件类型
 * 全局适用
 */
export function getCertificateType(v) {
  const data = [
    { value: '', label: '全部' },
    { value: 1, label: '身份证' },
    { value: 2, label: '护照' }
  ]
  return getData(data, v)
}

/**
 * 审核状态
 * 全局适用
 */
export function getAuditStatus(v) {
  const data = [
    { value: '', label: '全部' },
    { value: 0, label: '审核中' },
    { value: 1, label: '通过' },
    { value: 2, label: '未通过' }
  ]
  return getData(data, v)
}

/**
 * 是否显示
 * 全局适用
 */
export function getIsShow(v) {
  const data = [
    { value: '', label: '全部' },
    { value: 1, label: '是' },
    { value: 2, label: '否' }
  ]
  return getData(data, v)
}
