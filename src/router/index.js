import Vue from 'vue'
import VueRouter from 'vue-router'

import SignIn from '../views/SignIn'
import Page from '../views/Page'

import Welcome from '../views/pages/Welcome'
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
    name: 'Page',
    component: Page,
    children: [
      {
        path: '',
        name: 'Welcome',
        component: Welcome,
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
  }
  if (to.name !== 'SignIn') {
    let username = authentication.getUsername()
    let authToken = authentication.getAuthToken()
    if (await authentication.validateAuthToken(username, authToken) === false) {
      authentication.destroyToken()
      next('/signin')
    } else {
      next()
    }
  } else {
    next()
  }

})

export default router