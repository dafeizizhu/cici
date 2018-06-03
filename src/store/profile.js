const Api = require('api')

export default {
  namespaced: true,
  state: () => ({
    vcsTypes: [],
    userInfo: {
      id: '',
      yyuid: '',
      name: '',
      description: ''
    },
    vcsInfoList: [{
      id: '',
      description: '',
      type: '',
      username: '',
      password: ''
    }],
    projectInfoList: [{
      id: '',
      vcsId: '',
      name: '',
      descripton: ''
    }]
  }),
  actions: {
    findProfile: ({ state, commit }, { session }) => {
      return Api.getSharedInstance().findProfile(session)
        .then(model => commit('findProfile', Object.assign(model, { session })))
    },
    saveProfile: ({ state, commit }) => {
      console.info(JSON.parse(JSON.stringify(state.vcsInfoList)))
      return Promise.reject(new Error('not implemented'))
    },
    removeVCS: ({ state, commit }, { session, vcsId }) => {
      return Api.getSharedInstance().deleteProfileVCS(vcsId, session)
        .then(_ => commit('removeVCS', { vcsId }))
    }
  },
  mutations: {
    findProfile: (state, { session, vcsTypes, userInfo, vcsInfoList, projectInfoList }) => {
      state.session = session
      state.vcsTypes = vcsTypes
      state.userInfo = userInfo
      state.vcsInfoList = vcsInfoList
      state.projectInfoList = projectInfoList
    },
    removeVCS: (state, { vcsId }) => {
      let index = state.vcsInfoList.map(vcs => vcs.id).indexOf(vcsId)
      state.vcsInfoList = [...state.vcsInfoList.slice(0, index), ...state.vcsInfoList.slice(index + 1)]
    }
  }
}
