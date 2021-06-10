/**
 * 获取image
 */
function captureImage(url) {
  console.log('-video-url-', url)
  // TODO: 通过 ref 获取video元素
  this.$refs.videoUploadRef.getVideoEl(el => {
    console.log('-video-el-', el)
    this.loadVideo(el, url).then(videoEl => {
      // 创建canvas画布
      let canvas = document.createElement('canvas')
      canvas.width = videoEl.width // 设置画布的长宽也就是video的长宽
      canvas.height = videoEl.height
      canvas.getContext('2d').drawImage(videoEl, 0, 0, canvas.width, canvas.height)
      let img = document.createElement('img')
      img.setAttribute('crossOrigin', 'Anonymous')
      img.src = canvas.toDataURL('image/png') // 转base-64
      console.log('-img-src-', img.src)
      let name = img.src.substring(img.src.lastIndexOf('/') + 1, img.src.length)
      this.base64URLtoFile(img.src, name)
    })
  })
}

/**
 * 加载视频
 */
function loadVideo(videoEl, url) {
  return new Promise(function(resolve, reject) {
    videoEl.setAttribute('src', url) // 视频的链接
    // 当前帧的视频是可用的
    videoEl.onloadeddata = function() {
      resolve(videoEl)
    }
    // 加载失败
    videoEl.onerror = function() {
      reject(new Error())
    }
  })
}

/**
 * 将base64转换为file类型
 */
function base64URLtoFile(dataurl, filename) {
  console.log('-dataurl-', dataurl)
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1]) // 解码base-64编码的字符串
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr = bstr.charCodeAt(n)
  }
  let file = new File([u8arr], filename, { type: mime })
  // TODO: 调用上传图片的接口
  console.log('-file-', file)
}

export default {
  // 获取image
  captureImage,
  // video加载完成
  loadVideo,
  // base64转file类型
  base64URLtoFile
}
