const Api = require('api')

export default {
  namespaced: true,
  state: () => ({
    branchInfo: {},
    commitInfoList: []
  }),
  actions: {
    findCommits: ({ state, commit }, { session, branchId }) => {
      return Api.getSharedInstance().findCommits(branchId, session)
        .then(({ branchInfo, commitInfoList }) => commit('findCommits', { session, branchInfo, commitInfoList }))
    }
  },
  mutations: {
    findCommits: (state, { session, branchInfo, commitInfoList }) => {
      state.session = session
      state.branchInfo = branchInfo
      state.commitInfoList = commitInfoList
    }
  }
}
