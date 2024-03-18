import NProgress from 'nprogress'

// 安装pinia全局状态库
export function install() {
  NProgress.configure({ easing: 'ease', speed: 500 })
  // mount on window
  window.$NProgress = NProgress
}
