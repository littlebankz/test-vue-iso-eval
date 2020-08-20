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
  next_evaluate_id: 1,
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
    // using p'song work data structure
    work_list: [
      {
        work: {
          id: 1,
          name: "งาน 1",
          createDate: "16/07/2020",
          user: {
            name: "ผู้จัดทำ ก",
            surname: "",
          },
          company: {
            name: "บริษัท กอไก่",
          },
          department: {
            name: "หน่วยงาน ก",
          },
          areas: [
            { id: 1, name: "พื้นที่ ก", areaType: "inner", activities: [{ id: 1 }, { id: 2 }] },
            { id: 2, name: "พื้นที่ ข", areaType: "inner", activities: [{ id: 3 }] },
            { id: 3, name: "พื้นที่ ค", areaType: "inner", activities: [{ id: 4 }] },
            { id: 4, name: "พื้นที่ ง", areaType: "outer", activities: [{ id: 5 }] },
            { id: 5, name: "พื้นที่ จ", areaType: "outer", activities: [{ id: 6 }] },
            { id: 6, name: "พื้นที่ ฉ", areaType: "outer", activities: [{ id: 7 }] },
          ],
          activities: [
            {
              id: 1,
              name: "กิจกรรม 1",
            },
            {
              id: 2,
              name: "กิจกรรม 2",
            },
            {
              id: 3,
              name: "กิจกรรม 3",
            },
            {
              id: 4,
              name: "กิจกรรม 4",
            },
            {
              id: 5,
              name: "กิจกรรม 5",
            },
            {
              id: 6,
              name: "กิจกรรม 6",
            },
            {
              id: 7,
              name: "กิจกรรม 7",
            },
          ], // all activity related to this work
          evaluateworks: [
            {
              id: 1,
              name: "รายงาน 1",
              evaluateDate: "16/07/2020",
              evaluateNumber: "",
              evaluateType: "",
              matchrisk: [
                {
                  id: 1,
                  area: {},
                  activities: {},
                  risks: {},
                  evaluate: {
                    p1: "",
                    p2: "",
                    p3: "",
                    p4: "",
                    p5: "",
                    r1: "",
                    r2: "",
                  },
                },
              ],
            },
            {
              id: 2,
              name: "รายงาน 2",
              evaluateDate: "16/07/2020",
              evaluateNumber: "",
              evaluateType: "",
              matchrisk: [
                {
                  id: 1,
                  area: {},
                  activities: {},
                  risks: {},
                  evaluate: {
                    p1: "",
                    p2: "",
                    p3: "",
                    p4: "",
                    p5: "",
                    r1: "",
                    r2: "",
                  },
                },
              ],
            },
            {
              id: 3,
              name: "รายงาน 3",
              evaluateDate: "16/07/2020",
              evaluateNumber: "",
              evaluateType: "",
              matchrisk: [
                {
                  id: 1,
                  area: {},
                  activities: {},
                  risks: {},
                  evaluate: {
                    p1: "",
                    p2: "",
                    p3: "",
                    p4: "",
                    p5: "",
                    r1: "",
                    r2: "",
                  },
                },
              ],
            },
          ],
        },
      },
    ],
  },
};

const getters = {
  allWorkEvalInfo: (state) => (work_id) => {
    const workObj = state.example.work_list.find((work_list) => work_list.work.id == work_id).work;

    return workObj.evaluateworks.map((work_eval) => {
      return {
        work_eval_id: work_eval.id,
        work_eval_name: work_eval.name,
        work_eval_company: workObj.company.name,
        work_eval_department: workObj.department.name,
        work_eval_author: workObj.user.name,
        work_eval_date: work_eval.evaluateDate,
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
  getAreaList: (state) => (work_id) => {
    const workObj = state.example.work_list.find((work_list) => work_list.work.id == work_id).work;
    return workObj.areas;
    // return state.example.area;
  },

  getActivityList: (state) => (work_id) => {
    const workObj = state.example.work_list.find((work_list) => work_list.work.id == work_id).work;
    return workObj.activities;
    // return state.example.activity;
  },

  getWorkEvalInfo: (state) => (work_id, eval_id) => {
    const workObj = state.example.work_list.find((work_list) => work_list.work.id == work_id).work;
    const evalObj = workObj.evaluateworks.find((evaluate) => evaluate.id == eval_id);
    return evalObj;
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
    commit("increaseNextRiskID");
  },

  increaseNextEvalID({ commit }) {
    commit("increaseNextEvalID");
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
  increaseNextRiskID(state) {
    state.next_risk_id++;
  },
  increaseNextEvalID(state) {
    state.next_evaluate_id++;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
