import authentication from "../../plugins/authentication";

const state = {
  userInfo: {
    username: "",
    authToken: "",
    role: "",
  },
};

const getters = {
  allUserInfo: (state) => state.userInfo,
  blankUserInfo: () => {
    return { username: "", authToken: "", role: "" };
  },
};

const actions = {
  setUserInfo({ commit }, userInfo) {
    authentication.setLocalStorageUsername(userInfo.username);
    authentication.setLocalStorageAuthToken(userInfo.authToken);

    commit("setUserInfo", userInfo);
  },
  clearUserInfo({ commit }) {
    authentication.signOut();

    commit("removeUserInfo");
  },
};

const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload;
  },
  removeUserInfo(state) {
    state.userInfo = this.blankUserInfo;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
