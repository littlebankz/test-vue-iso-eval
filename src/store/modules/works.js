import moment from "moment";

const state = {
  work_list: [
    {
      work: {
        work_id: 1,
        work_name: "งาน 1",
        work_company: "บริษัท กอไก่",
        work_department: "หน่วยงาน ก",
        work_author: "ผู้จัดทำ ก",
        work_date: "16/07/2020",
      },
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
          area_id: 2,
        },
        {
          activity_id: 3,
          activity_name: "กิจกรรม 3",
          activity_type: "Routine",
          activity_work_area: "ทำภายในบริษัท",
          activity_performer: "พนักงาน",
          activity_stakesholder: "พนักงาน",
          area_id: 3,
        },
        {
          activity_id: 4,
          activity_name: "กิจกรรม 4",
          activity_type: "Routine",
          activity_work_area: "ทำภายในบริษัท",
          activity_performer: "พนักงาน",
          activity_stakesholder: "พนักงาน",
          area_id: 4,
        },
        {
          activity_id: 5,
          activity_name: "กิจกรรม 5",
          activity_type: "Routine",
          activity_work_area: "ทำภายในบริษัท",
          activity_performer: "พนักงาน",
          activity_stakesholder: "พนักงาน",
          area_id: 5,
        },
        {
          activity_id: 6,
          activity_name: "กิจกรรม 6",
          activity_type: "Routine",
          activity_work_area: "ทำภายในบริษัท",
          activity_performer: "พนักงาน",
          activity_stakesholder: "พนักงาน",
          area_id: 6,
        },
        {
          activity_id: 7,
          activity_name: "กิจกรรม 7",
          activity_type: "Routine",
          activity_work_area: "ทำภายในบริษัท",
          activity_performer: "พนักงาน",
          activity_stakesholder: "พนักงาน",
          area_id: 1,
        },
      ],
    },
    {
      work: {
        work_id: 2,
        work_name: "งาน 2",
        work_company: "บริษัท ขอไข่ ",
        work_department: "หน่วยงาน ข",
        work_eval_type: "ประจำปี",
        work_author: "ผู้จัดทำ ข",
        work_date: "17/07/2020",
      },
      area: [],
      activity: [],
    },
    {
      work: {
        work_id: 3,
        work_name: "งาน 3",
        work_company: "บริษัท คอควาย ",
        work_department: "หน่วยงาน ค",
        work_author: "ผู้จัดทำ ค",
        work_date: "18/07/2020",
      },
      area: [],
      activity: [],
    },
    {
      work: {
        work_id: 4,
        work_name: "งาน 4",
        work_company: "บริษัท งองู ",
        work_department: "หน่วยงาน ง",
        work_author: "ผู้จัดทำ ง",
        work_date: "19/07/2020",
      },
      area: [],
      activity: [],
    },
  ],
  buffer: {
    work: {},
    area: [],
    activity: [],
    inner_activity: [],
    outer_activity: [],
  },
  next_work_id: 5,
  next_activity_id: 1,
};

const getters = {
  allWorkInfo: (state) => {
    return state.work_list.map((work_list) => {
      return {
        work_id: work_list.work.work_id,
        work_name: work_list.work.work_name,
        work_company: work_list.work.work_company,
        work_department: work_list.work.work_department,
        work_author: work_list.work.work_author,
        work_date: work_list.work.work_date,
      };
    });
  },
  workInfoFromID: (state) => (id) => {
    const findWorkInfo = state.work_list.filter((work_area_activity) => {
      return work_area_activity.work.work_id == id;
    });
    if (findWorkInfo.length == 1) {
      return findWorkInfo[0];
    }
  },
  areaList: (state) => (scope) => {
    return state.buffer.area.filter((area) => {
      return area.area_type == scope;
    });
  },
  activityInArea: (state) => (id) => {
    return state.buffer.activity.filter((activity) => {
      return activity.area_id == id;
    });
  },
};

const actions = {
  updateWorkBuffer({ state, commit }, buffer_input) {
    const payload = {
      ...buffer_input,
      work_id: state.next_work_id,
      work_date: moment().format("DD/MM/YYYY"),
    };
    commit("updateWorkBuffer", payload);
  },
  updateAreaBuffer({ commit }, buffer_input) {
    commit("updateAreaBuffer", buffer_input);
  },
  updateActivityBuffer({ commit }, { buffer_input, area_scope }) {
    if (area_scope == "inner") {
      commit("updateInnerActivityBuffer", buffer_input);
    } else {
      commit("updateOuterActivityBuffer", buffer_input);
    }
  },
  increaseNextActivityID({ commit }) {
    commit("increaseNextActivityID");
  },
  pushBufferToState({ commit }) {
    commit("addNewWork");
  },
};

const mutations = {
  updateWorkBuffer(state, value) {
    state.buffer.work = value;
  },
  updateAreaBuffer(state, value) {
    state.buffer.area = value;
  },
  updateInnerActivityBuffer(state, value) {
    state.buffer.inner_activity = value;
    state.buffer.activity = state.buffer.inner_activity.concat(state.buffer.outer_activity);
  },
  updateOuterActivityBuffer(state, value) {
    state.buffer.outer_activity = value;
    state.buffer.activity = state.buffer.inner_activity.concat(state.buffer.outer_activity);
  },
  increaseNextActivityID(state) {
    state.next_activity_id++;
  },
  addNewWork(state) {
    const payload = {
      work: state.buffer.work,
      area: state.buffer.area,
      activity: state.buffer.activity,
    };
    const new_work = JSON.parse(JSON.stringify(payload));
    state.work_list.push(new_work);
    state.next_work_id++;
  },
  clearBuffer(state) {
    state.buffer = {
      work: {},
      area: [],
      activity: [],
      inner_activity: [],
      outer_activity: [],
    };
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
