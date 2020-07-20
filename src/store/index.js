import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      username: '',
      authToken: '',
      role: '',
    },
    addNewWork: {
      workInfo: {
        workname: "",
        company: "",
        department: "",
        evalType: "",
        author: ""
      },
      area: {
        inner: [],
        outer: []
      },
    }
  },
  mutations: {
    setUserInfo(state, value) {
      let { username, authToken, role } = value
      state.userInfo.username = username
      state.userInfo.authToken = authToken
      state.userInfo.role = role
    },
    clearUserInfo(state) {
      state.userInfo.username = ''
      state.userInfo.authToken = ''
      state.userInfo.role = ''
    },
    updateWorkInfo(state, value) {
      state.addNewWork.workInfo = value
    },
    updateArea(state, value) {
      state.addNewWork.area = value
    },
    updateActivity() {

    },

  },
  actions: {
  },
  modules: {
  }
})
