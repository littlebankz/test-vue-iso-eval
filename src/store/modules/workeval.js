const state = {
  buffer: {
    work_eval: {},
    area_inner: [],
    area_outer: [],
    activity_inner: [],
    activity_outer: [],
    env_area_inner: [],
    sec_area_inner: [],
    env_area_outer: [],
    sec_area_outer: [],
    env_activity_inner: [],
    sec_activity_inner: [],
    env_activity_outer: [],
    sec_activity_outer: [],
  },
  next_work_eval_id: 5,
  next_risk_id: 1,
  work_eval_list: [
    {
      work_eval: {
        work_eval_id: 1,
        work_eval_name: "รายงาน 1",
        work_eval_company: "บริษัท กอไก่",
        work_eval_department: "หน่วยงาน ก",
        work_eval_author: "ผู้จัดทำ ก",
        work_eval_date: "16/07/2020",
      },
    },
    {
      work_eval: {
        work_eval_id: 2,
        work_eval_name: "รายงาน 2",
        work_eval_company: "บริษัท กอไก่",
        work_eval_department: "หน่วยงาน ก",
        work_eval_author: "ผู้จัดทำ ก",
        work_eval_date: "17/07/2020",
      },
    },
    {
      work_eval: {
        work_eval_id: 3,
        work_eval_name: "รายงาน 3",
        work_eval_company: "บริษัท กอไก่",
        work_eval_department: "หน่วยงาน ก",
        work_eval_author: "ผู้จัดทำ ก",
        work_eval_date: "18/07/2020",
      },
    },
    {
      work_eval: {
        work_eval_id: 4,
        work_eval_name: "รายงาน 4",
        work_eval_company: "บริษัท กอไก่",
        work_eval_department: "หน่วยงาน ก",
        work_eval_author: "ผู้จัดทำ ก",
        work_eval_date: "19/07/2020",
      },
    },
  ],
  example: {
    area: [
      { area_id: 1, area_name: "พื้นที่ ก", area_type: "inner" },
      { area_id: 2, area_name: "พื้นที่ ข", area_type: "inner" },
      { area_id: 3, area_name: "พื้นที่ ค", area_type: "inner" },
      { area_id: 4, area_name: "พื้นที่ ง", area_type: "outer" },
      { area_id: 5, area_name: "พื้นที่ จ", area_type: "outer" },
      { area_id: 6, area_name: "พื้นที่ ฉ", area_type: "outer" },
    ],
    activity: [
      {
        activity_id: 1,
        activity_name: "กิจกรรม 1",
        activity_type: "Routine",
        activity_work_area: "ทำภายในบริษัท",
        activity_performer: "พนักงาน",
        activity_stakesholder: "พนักงาน",
        area_id: 1,
      },
      {
        activity_id: 2,
        activity_name: "กิจกรรม 2",
        activity_type: "Routine",
        activity_work_area: "ทำภายในบริษัท",
        activity_performer: "พนักงาน",
        activity_stakesholder: "พนักงาน",
        area_id: 1,
      },
      {
        activity_id: 3,
        activity_name: "กิจกรรม 3",
        activity_type: "Routine",
        activity_work_area: "ทำภายในบริษัท",
        activity_performer: "พนักงาน",
        activity_stakesholder: "พนักงาน",
        area_id: 2,
      },
      {
        activity_id: 4,
        activity_name: "กิจกรรม 4",
        activity_type: "Routine",
        activity_work_area: "ทำภายในบริษัท",
        activity_performer: "พนักงาน",
        activity_stakesholder: "พนักงาน",
        area_id: 3,
      },
      {
        activity_id: 5,
        activity_name: "กิจกรรม 5",
        activity_type: "Routine",
        activity_work_area: "ทำภายในบริษัท",
        activity_performer: "พนักงาน",
        activity_stakesholder: "พนักงาน",
        area_id: 4,
      },
      {
        activity_id: 6,
        activity_name: "กิจกรรม 6",
        activity_type: "Routine",
        activity_work_area: "ทำภายในบริษัท",
        activity_performer: "พนักงาน",
        activity_stakesholder: "พนักงาน",
        area_id: 5,
      },
      {
        activity_id: 7,
        activity_name: "กิจกรรม 7",
        activity_type: "Routine",
        activity_work_area: "ทำภายในบริษัท",
        activity_performer: "พนักงาน",
        activity_stakesholder: "พนักงาน",
        area_id: 6,
      },
    ],
  },
};

const getters = {
  allWorkEvalInfo: (state) => {
    return state.work_eval_list.map((work_eval_list) => {
      return {
        work_eval_id: work_eval_list.work_eval.work_eval_id,
        work_eval_name: work_eval_list.work_eval.work_eval_name,
        work_eval_company: work_eval_list.work_eval.work_eval_company,
        work_eval_department: work_eval_list.work_eval.work_eval_department,
        work_eval_author: work_eval_list.work_eval.work_eval_author,
        work_eval_date: work_eval_list.work_eval.work_eval_date,
      };
    });
  },

  riskInArea: (state) => (form_scope, area_id) => {
    return state.buffer[form_scope].filter((risk) => {
      return risk.area_id == area_id;
    });
  },

  riskInAreaAndActivity: (state) => (form_scope, area_id, activity_id) => {
    return state.buffer[form_scope].filter((risk) => {
      return risk.area_id == area_id && risk.activity_id == activity_id;
    });
  },
  getExampleAreaList: (state) => {
    return state.example.area;
  },

  getExampleActivityList: (state) => {
    return state.example.activity;
  },

  nextRiskID: (state) => {
    return state.next_risk_id;
  },
};

const actions = {
  updateWorkEvalBuffer({ state, commit }, buffer_input) {
    const payload = {
      ...buffer_input,
      work_eval_id: state.next_work_eval_id,
    };

    commit("updateWorkEvalBuffer", payload);
  },
  updateRiskBuffer({ commit }, payload) {
    commit("updateRiskBuffer", payload);
  },

  increaseNextRiskID({ commit }) {
    commit("increaseNextActivityID");
  },
};

const mutations = {
  updateWorkEvalBuffer(state, value) {
    state.buffer.work_eval = value;
  },
  // buffer: {
  //   area_inner: [],
  //   area_outer: [],
  //   activity_inner: [],
  //   activity_outer: [],
  //   env_area_inner: [],
  //   env_area_outer: [],
  //   sec_area_inner: [],
  //   sec_area_outer: [],
  //   env_activity_inner: [],
  //   env_activity_outer: [],
  updateRiskBuffer(state, value) {
    const { buffer_input, form_scope } = value;
    state.buffer[form_scope] = buffer_input;
  },
  increaseNextActivityID(state) {
    state.next_risk_id++;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
