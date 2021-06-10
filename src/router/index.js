/*
 * @Author: wangshengxian
 * @Date: 2020-08-17 15:34:15
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-09-24 10:50:55
 * @Desc: 路由配置模块
 */
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'

/**
 * 自动化引入js模块
 */
const modulesFiles = require.context('./modules', false, /\.js$/)

const modulesRouters = modulesFiles.keys().reduce((total, curr) => {
  const value = modulesFiles(curr)
  return total.concat([value.default])
}, [])

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true               if set true, item will not show in the sidebar(default is false) ==》如果设置为true,则不会在侧边栏中显示，默认为false
 * alwaysShow: true           if set true, will always show the root menu ==》设置为true将始终显示根菜单
 * redirect: noRedirect       if set noRedirect will no redirect in the breadcrumb ==》如果设置了noRedirect将不会在面包屑中重定向
 * name:'router-name'         the name is used by <keep-alive> (must set!!!) ==》路由名称，必须设置
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles) ==》控制页面角色，可以设置多个
    title: 'title'               the name show in sidebar and breadcrumb (recommend set) ==》菜单标题名以及面包屑中显示（推荐设置）
    icon: 'svg-name'             the icon show in the sidebar  ==》侧边菜单栏标题图标
    affix: true                  if set true, the tag will affix in the tags-view  ==》如果设置为true,标签将粘贴在标签视图中
    breadcrumb: false     if set false, the item will hidden in breadcrumb(default is true) ==》若设置为false，则该选项将隐藏在面包屑中，默认为true
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set ==》如果设置了路径，侧边栏将突出显示你设置的路径,一般不设置该项
  }
 */

const Index = () => import(/* webpackChunkName: 'index' */ '@/views/index')
const Redirect = () => import(/* webpackChunkName: "redirect" */ '@/views/index/redirect')
const Login = () => import(/* webpackChunkName: "login" */ '@/views/login/index')
const Page404 = () => import(/* webpackChunkName: "404" */ '@/views/errorPage/404')
const Page401 = () => import(/* webpackChunkName: "401" */ '@/views/errorPage/401')

// 公共路由
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: Index,
        hidden: true,
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true,
    meta: { title: '登录' }
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: Redirect
      }
    ]
  },
  { path: '/404', component: Page404, name: 'Page404', hidden: true },
  { path: '/401', component: Page401, name: 'Page401', hidden: true }
]

// 权限路由
export const asyncRoutes = [...modulesRouters, { path: '*', redirect: '/404', hidden: true }]

// console.log('-base-url-', process.env.BASE_URL)

const createRouter = () =>
  new Router({
    mode: 'history',
    base: process.env.BASE_URL, // process.env.BASE_URL 对应的是vue.config.js中的publicPath的路径
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
