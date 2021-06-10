import defaultSettings from '@/settings'

const showSettings = defaultSettings.showSettings

let tagsView = localStorage.getItem('tagsView')
let fixedHeader = localStorage.getItem('fixedHeader')
let sidebarLogo = localStorage.getItem('sidebarLogo')
tagsView = tagsView ? (tagsView === 'true') : defaultSettings.tagsView
fixedHeader = fixedHeader ? (fixedHeader === 'true') : defaultSettings.fixedHeader
sidebarLogo = sidebarLogo ? (sidebarLogo === 'true') : defaultSettings.sidebarLogo

const state = {
  theme: '#1890ff',
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
      localStorage.setItem(key, value)
    }
  }
}

const actions = {
  changeSetting ({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
