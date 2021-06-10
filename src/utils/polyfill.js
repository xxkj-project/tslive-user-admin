/**
 * 一些polyfill方案
 */
;(function () {
  //  Element.matches
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector
  }

  // Element.closest
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var el = this
      if (!document.documentElement.contains(el)) return null
      do {
        if (el.matches(s)) return el
        el = el.parentElement
      } while (el !== null)
      return null
    }
  }
})()
