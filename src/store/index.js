import Vue from "vue";
import Vuex from "vuex";

import authentication from "./modules/authentication";
import works from "./modules/works";
import workeval from "./modules/workeval";
import company from "./modules/company";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    works,
    workeval,
    company,
  },
});
