import Vue from 'vue'
import VueRouter from 'vue-router'

import SignIn from '../views/SignIn'
import Page from '../views/Page'

import Work from '../views/pages/Work'

import Account from '../views/pages/Account'
import About from '../views/pages/About'

import authentication from '../plugins/authentication'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/signout',
    name: 'SignOut',
  },
  {
    path: '/',
    name: 'Home',
    component: Page,
    children: [
      {
        path: 'work',
        name: 'Work',
        component: Work,
      },
      {
        path: 'account',
        name: 'Account',
        component: Account,
      },
      {
        path: 'about',
        name: 'About',
        component: About,
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  
  if (to.name === 'SignOut') {
    authentication.destroyToken();
    this.$store.commit('clearUserInfo')
  }
  if (to.name !== 'SignIn') {
    let username = authentication.getUsername()
    let authToken = authentication.getAuthToken()
    if (await authentication.validateAuthToken(username, authToken) === false) {
      authentication.destroyToken()
      next('/signin')
    } else {
      if (to.name === 'Home') {
        next('/work')
      } else {
        next()
      }
    }
  } else {
    next()
  }

})

export default router