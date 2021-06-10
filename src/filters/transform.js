// 字段转中文 - 局部
/**
 * 字段转中文
 * 传v时返回匹配的label(用于转换中文)，不传v时返回data数组(用于el-select等数据)
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
 * 内容管理 - 大V短视频 - 状态
 */
export function getAuditType(v) {
  const data = [
    { value: '', label: '全部' },
    { value: 'AUDIT', label: '审核中' },
    { value: 'PASS', label: '已通过' },
    { value: 'FAIL', label: '未通过' }
  ]
  return getData(data, v)
}
