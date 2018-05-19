const Api = require('api')

export default {
  namespaced: true,
  state: () => ({
    projectId: '',
    projectInfoList: [],
    branchInfoList: []
  }),
  actions: {
    findBranches: ({ state, commit }, { userId }) => {
      return Api.getSharedInstance().findBranches(userId)
        .then(model => commit('findBranches', model))
    }
  },
  mutations: {
    findBranches: (state, { projectInfoList, branchInfoList }) => {
      state.projectInfoList = projectInfoList
      state.branchInfoList = branchInfoList
    }
  }
}
