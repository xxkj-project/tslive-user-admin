// 字段转中文

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
 * 主播管理 - 主播申请 - 审核不通过模板
 */
export function anchorAuditTemplate(v) {
  const data = [
    { value: 1, label: '您好。这里是主播申请，不是实名认证哦' },
    { value: 2, label: '视频认证里可以做个简单自我介绍，以及申请主播想要直播的内容哦' },
    { value: 3, label: '视频认证里可以表演下才艺，优质内容较容易通过审核哦' },
    { value: 4, label: '视频认证里可以表演下才艺，以及申请主播想要直播的内容，优质内容较容易通过审核哦' }
  ]
  return getData(data, v)
}

/**
 * 内容管理 - 短视频 - 审核不通过模板
 */
export function shortVideoAuditTemplate(v) {
  const data = [
    { value: 1, label: '请勿上传含有其他平台水印视频' },
    { value: 2, label: '因平台相关规定，请勿上传含有广告内容视频' },
    { value: 3, label: '因国家相关规定，请勿上传含有色情、血腥、暴力等相关视频' },
    { value: 4, label: '因国家相关规定，请勿上传含有政治、宗教恶意导向相关视频' },
    { value: 5, label: '因国家相关规定，请勿上传含有枪支、刀具威力测试或展示等相关视频' }
  ]
  return getData(data, v)
}

/**
 * 用户管理 - 实名认证 - 审核不通过模板
 */
export function realNameAuditTemplate(v) {
  // value值必须为 Number 类型
  const data = [
    { value: 1, label: '请上传本人手持身份证(正面)清晰上身照' },
    { value: 2, label: '请填写与证件一致身份证号' },
    { value: 3, label: '上传证件与手持证件不符，请重新上传' },
    { value: 4, label: '上传证件已失效，请重新上传有效证件' },
    { value: 5, label: '请按照视频认证要求上传审核视频' }
  ]
  return getData(data, v)
}

/**
 * 订单管理 - 提现管理 - 审核不通过模板
 */
export function withdrawAuditTemplate(v) {
  const data = [{ value: 1, label: '请提供正确的提现地址' }]
  return getData(data, v)
}
