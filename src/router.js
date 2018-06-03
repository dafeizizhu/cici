import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [{
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ './components/Home.vue')
    }, {
      path: '/projects',
      component: () => import(/* webpackChunkName: "projects" */ './components/Projects.vue')
    }, {
      path: '/project',
      component: () => import(/* webpackChunkName: "project" */ './components/Project.vue')
    }, {
      path: '/branches',
      component: () => import(/* webpackChunkName: "branch" */ './components/Branches.vue')
    }, {
      path: '/branch',
      component: () => import(/* webpackChunkName: "branch" */ './components/Branch.vue')
    }, {
      path: '/profile',
      component: () => import(/* webpackChunkName: "profile" */ './components/Profile.vue')
    }, {
      path: '/adminProject',
      component: () => import(/* webpackChunkName: "admin" */ './components/AdminProject.vue')
    }, {
      path: '/profileVCS',
      component: () => import(/* webpackChunkName: "profileVCS" */ './components/ProfileVCS.vue')
    }]
  })
}
