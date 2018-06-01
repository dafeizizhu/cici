const Api = require('api')

export default {
  namespaced: true,
  state: () => ({
    projectId: '',
    projectInfoList: [],
    branchInfoList: []
  }),
  actions: {
    findBranches: ({ state, commit }, { session }) => {
      return Api.getSharedInstance().findBranches(session)
        .then(model => commit('findBranches', Object.assign(model, { session })))
    }
  },
  mutations: {
    findBranches: (state, { session, projectInfoList, branchInfoList }) => {
      state.session = session
      state.projectInfoList = projectInfoList
      state.branchInfoList = branchInfoList
    }
  }
}
