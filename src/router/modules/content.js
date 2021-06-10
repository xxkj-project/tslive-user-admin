/*
 * @Author: wangshengxian
 * @Date: 2020-08-17 16:11:33
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-10-22 14:23:12
 * @Desc: 内容管理路由模块
 */
import Layout from '@/views/layout'

// 大V短视频
const VshortVideoList = () => import(/* webpackChunkName: 'vshortVideo' */ '@/views/content/vshortVideo')

const contentRouter = {
  path: '/content',
  name: 'Content',
  component: Layout,
  redirect: '/content/uploadRecordList',
  alwaysShow: true,
  meta: {
    title: '内容管理',
    icon: 'content'
  },
  children: [
    {
      path: 'vshortVideo',
      name: 'VshortVideoList',
      component: VshortVideoList,
      meta: {
        title: '大V短视频',
        icon: 'menu'
      }
    }
  ]
}

export default contentRouter
