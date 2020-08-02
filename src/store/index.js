import Vue from "vue";
import Vuex from "vuex";

import authentication from "./modules/authentication";
import works from "./modules/works";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    works,
  },
});
