import Vue from "vue";
// import store from "../store";
import VueRouter from "vue-router";

import SignIn from "../views/SignIn";
import SignOut from "../views/SignOut";
import Page from "../views/Page";

import WorkList from "../views/pages/WorkList";
import WorkReport from "../views/pages/WorkReport";
import WorkEvalList from "../views/pages/WorkEvalList";
import WorkEvalReport from "../views/pages/WorkEvalReport";
import WorkEvalReportEnvironment from "../views/pages/WorkEvalReportEnvironment";
import WorkEvalReportSecurity from "../views/pages/WorkEvalReportSecurity";

import Account from "../views/pages/Account";
import About from "../views/pages/About";
import Company from "../views/pages/Company";

// import authentication from "../plugins/authentication";

Vue.use(VueRouter);

const routes = [
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/signout",
    name: "SignOut",
    component: SignOut,
  },
  {
    path: "/",
    name: "Home",
    component: Page,
    children: [
      {
        path: "work/",
        name: "WorkList",
        component: WorkList,
      },
      {
        path: "work/:id/",
        name: "WorkReport",
        component: WorkReport,
      },
      {
        path: "workeval/:id/",
        name: "WorkEvalList",
        component: WorkEvalList,
      },
      {
        path: "workeval/:id/:eval_id/",
        name: "WorkEvalReport",
        component: WorkEvalReport,
      },
      {
        path: "workeval/:id/:eval_id/environment/",
        name: "WorkEvalReportEnvironment",
        component: WorkEvalReportEnvironment,
      },
      {
        path: "workeval/:id/:eval_id/security/",
        name: "WorkEvalReportSecurity",
        component: WorkEvalReportSecurity,
      },
      {
        path: "account",
        name: "Account",
        component: Account,
      },
      {
        path: "about",
        name: "About",
        component: About,
      },
      {
        path: "company",
        name: "Company",
        component: Company,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach(async (to, from, next) => {
  if (to.name === "Home") {
    next("/work");
  } else {
    next();
  }

  /* REMOVE COMMENT ON PRODUCTION */

  // if (to.name !== "SignIn") {
  //   const username = authentication.getLocalStorageUsername();
  //   const authToken = authentication.getLocalStorageAuthToken();

  //   const response = await authentication.validateAuthToken(username, authToken);

  //   if (response.isValid === false) {
  //     authentication.destroyLocalStorageItems();
  //     next("/signin");
  //   } else {
  //     const role = response.role;
  //     store.dispatch("setUserInfo", { username, authToken, role });
  //     if (to.name === "Home") {
  //       next("/work");
  //     } else {
  //       next();
  //     }
  //   }
  // } else {
  //   next();
  // }

  /*                              */
});

export default router;
