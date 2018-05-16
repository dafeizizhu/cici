import Vue from 'vue'
import Vuex from 'vuex'

import home from './home'
import profile from './profile'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules: {
      home,
      profile
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
