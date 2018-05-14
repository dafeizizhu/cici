import Vue from 'vue'
import Vuex from 'vuex'

import home from './home'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules: {
      'home': home
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