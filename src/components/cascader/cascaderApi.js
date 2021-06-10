// 级联选择器动态加载config配置，通过leaf字段来判断是否有下一级
// ==> leaf ==> true 没有下一级，反之有下一级

/**
 * 三级联动动态获取数据
 */
export function getAreaList(node, levelVal) {
  let { data, level } = node

  const list = [
    { id: '11', name: '分类1-坚果', children: [] },
    { id: '12', name: '分类1-薯片', children: [] }
  ]

  let childrenList = list.map(val => {
    return {
      leaf: level >= levelVal,
      children: [],
      label: val.name,
      value: val.id,
      ...val
    }
  })

  data['children'] = childrenList
  console.log('-area-list-', data)

  return data
}
