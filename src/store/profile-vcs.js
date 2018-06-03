const Api = require('api')

export default {
  namespaced: true,
  state: () => ({
    session: {},
    vcsTypes: [],
    vcsInfo: {
      vcsType: {}
    }
  }),
  actions: {
    findProfileVCS: ({ state, commit }, { session, vcsId }) => {
      return Api.getSharedInstance().findProfileVCS(vcsId, session)
        .then(({ vcsTypes, vcsInfo }) => commit('findProfileVCS', { session, vcsTypes, vcsInfo }))
    },
    saveVCS: ({ state, commit }, { session, vcsInfo }) => {
      return Api.getSharedInstance().saveProfileVCS(vcsInfo, session)
    }
  },
  mutations: {
    findProfileVCS: (state, { session, vcsTypes, vcsInfo }) => {
      state.session = session
      state.vcsTypes = vcsTypes
      state.vcsInfo = vcsInfo
    }
  }
}
