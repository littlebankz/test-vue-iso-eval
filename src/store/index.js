import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newWork: {
      workname: "",
      company: "",
      department: "",
      evalType: "",
      author: "",

      innerAreaList: [],
      outerAreaList: []
    },
  },
  mutations: {
    updateWorkname(state, value) {
      state.newWork.workname = value
    },
    updateCompany(state, value) {
      state.newWork.company = value
    },
    updateDepartment(state, value) {
      state.newWork.department = value
    },
    updateEvalType(state, value) {
      state.newWork.evalType = value
    },
    updateAuthor(state, value) {
      state.newWork.author = value
    },

    updateInnerAreaList(state, value) {
      state.newWork.innerAreaList = value
    },
    updateOuterAreaList(state, value) {
      state.newWork.outerAreaList = value
    }
  },
  actions: {
  },
  modules: {
  }
})
