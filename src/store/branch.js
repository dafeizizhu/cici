const Api = require('api')

export default {
  namespaced: true,
  state: () => ({
    projectInfoList: [],
    vcsInfoList: [],
    branchInfo: {
      id: '',
      projectId: '',
      vcsId: '',
      name: '',
      description: '',
      vcsType: '',
      vcsUri: ''
    }
  }),
  actions: {
    findBranch: ({ store, commit }, { branchId, userId }) => {
      return Api.getSharedInstance().findBranch(branchId, userId)
        .then(model => commit('findBranch', model))
    }
  },
  mutations: {
    findBranch: (state, { projectInfoList, vcsInfoList, branchInfo }) => {
      state.projectInfoList = projectInfoList
      state.vcsInfoList = vcsInfoList
      state.branchInfo = branchInfo
    }
  }
}
