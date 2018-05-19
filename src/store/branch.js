const Api = require('api')

export default {
  namespaced: true,
  state: () => ({
    vcsTypes: [],
    projectInfoList: [],
    vcsInfoList: [],
    branchInfo: {
      id: '',
      projectId: '',
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
    },
    saveBranch: ({ store, commit }, { branchInfo, userId }) => {
      return Api.getSharedInstance().saveBranch(branchInfo, userId)
    }
  },
  mutations: {
    findBranch: (state, { vcsTypes, projectInfoList, vcsInfoList, branchInfo }) => {
      state.vcsTypes = vcsTypes
      state.projectInfoList = projectInfoList
      state.vcsInfoList = vcsInfoList
      state.branchInfo = branchInfo
    }
  }
}
