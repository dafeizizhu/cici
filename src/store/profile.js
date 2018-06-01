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
    addVCS: state => {
      state.vcsList = [...state.vcsList, {
        id: 'vcs_' + new Date().valueOf(),
        description: '111',
        type: '1',
        username: '111',
        password: '111'
      }]
    },
    removeVCS: (state, { vcsId }) => {
      let index = state.vcsList.map(vcs => vcs.id).indexOf(vcsId)
      state.vcsList = [...state.vcsList.slice(0, index), ...state.vcsList.slice(index + 1)]
    }
  }
}
