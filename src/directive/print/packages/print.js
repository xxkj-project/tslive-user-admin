import Print from './printarea.js'
/**
 * @file 打印
 * 指令`v-print`, 默认打印整个窗口
 * 传入参数`v-print="selector"` ,
 * 参数为string类型时，传入选择器字符串，参数为object类型时，传入配置参数options
 */
export default {
  directiveName: 'print',
  bind (el, binding, vnode) {
    let vue = vnode.context
    let closeBtn = true
    let currentUrl = window.location.href
    let printEle = null

    el.addEventListener('click', () => {
      vue.$nextTick(() => {
        if (!binding.value || !binding.value.selector) {
          // 全局打印
          window.print()
        } else {
          // 局部打印
          localPrint()
        }
      })
    })

    function localPrint () {
      if (!closeBtn) return
      closeBtn = false
      // 定义配置项
      let options = {
        selector: '', // * 局部打印必传入 选择器字符串
        popTitle: '', // title的标题
        width: '', // 打印的页面宽度，单位px，默认1000
        extraHead: '', // 附加在head标签上的额外标签,使用逗号分隔
        extraCss: '', // 额外的css链接，多个逗号分开
        beforeCallback: null, // 调用打印之前的回调
        endCallback: null // 调用打印之后的回调事件
      }
      // 区分string和object类型传参
      if (typeof binding.value === 'string') {
        options.selector = binding.value
        options.selector = function () {
          printEndCallback()
        }
      } else if (typeof binding.value === 'object' && binding.value.selector) {
        options.selector = binding.value.selector
        options.extraHead = binding.value.extraHead
        options.extraCss = binding.value.extraCss
        options.popTitle = binding.value.popTitle
        options.beforeCallback = binding.value.beforeCallback
        options.endCallback = function () {
          printEndCallback()
          if (binding.value.endCallback) {
            binding.value.endCallback()
          }
        }
      }
      printEle = document.querySelector(options.selector)
      if (!printEle) {
        console.warn("print error, can't find element")
        return
      }
      if (options.beforeCallback) {
        options.beforeCallback()
      }
      // 添加v-print类名
      printEle.classList.add('v-print')
      // 延时一下，给样式渲染
      setTimeout(() => {
        // 临时改变url，页脚信息，防止敏感信息泄露
        if (window.history.replaceState) {
          window.history.replaceState(null, null, '/')
        }
        // 开始打印
        return new Print(options)
      }, 100)
    }

    function printEndCallback () {
      closeBtn = true
      printEle.classList.remove('v-print')
      if (window.history.replaceState) {
        window.history.replaceState(null, null, currentUrl)
      }
    }
  }
}
