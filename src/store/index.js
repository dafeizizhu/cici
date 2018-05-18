import Vue from 'vue'
import Vuex from 'vuex'

import home from './home'
import profile from './profile'
import branch from './branch'
import project from './project'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules: {
      home,
      profile,
      branch,
      project
    },
    state: {
      session: {
        user: {
          id: '',
          yyuid: '',
          username: '',
          description: ''
        }
      }
    }
  })
}
