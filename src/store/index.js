import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      username: "",
      authToken: "",
      role: "",
    },
    work_list: {

    },
    buffer: {
      work: {
        work_id: "",
        work_name: "",
        work_company: "",
        work_department: "",
        work_eval_type: "",
        work_author: "",
        area_inner_id_list: [], // 1, 2, 3
        area_outer_id_list: [] // 4, 5, 6
      },
      area: {
        inner: [], // { area_id: 1, area_name: "พื้นที่ ก" },
        outer: [], // { area_id: 4, area_name: "พื้นที่ ง" },
        area_inner_activity_id_list: [],
        area_outer_activity_id_list: [],
      },
      inner_activity: [],
      outer_activity: [],
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
      state.userInfo.username = ""
      state.userInfo.authToken = ""
      state.userInfo.role = ""
    },
    updateWorkBuffer(state, value) {
      state.buffer.work = value
    },
    updateInnerAreaBuffer(state, value) {
      // Update inner area state
      state.buffer.area.inner = value

      // Update inner area id list in work state
      let id_list = []
      state.buffer.area.inner.forEach(area => {
        id_list.push(area.area_id)
      })
      state.buffer.work.area_inner_id_list = id_list
    },
    updateOuterAreaBuffer(state, value) {
      // Update outer area state
      state.buffer.area.outer = value

      // Update outer area id list in work state
      let id_list = []
      state.buffer.area.outer.forEach(area => {
        id_list.push(area.area_id)
      })
      state.buffer.work.area_outer_id_list = id_list
    },
    updateInnerBufferActivity(state, value) {
      state.buffer.inner_activity = value
    },
    updateOuterBufferActivity(state, value) {
      state.buffer.outer_activity = value
    },

  },
  actions: {
  },
  modules: {
  }
})
