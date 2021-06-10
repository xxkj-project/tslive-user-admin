/**
 * 打印插件
 *
 * 修改自 vue-print-nb
 */
import Print from './packages/print.js'
Print.install = function (Vue) {
  Vue.directive('print', Print)
}

export default Print
