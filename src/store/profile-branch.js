const Api = require('api')

export default {
  namespaced: true,
  state: () => ({
    session: {},
    vcsInfoList: [],
    userBranchInfo: {}
  }),
  actions: {
    findProfileBranch: ({ state, commit }, { session, branchId }) => {
      return Api.getSharedInstance().findProfileBranch(branchId, session)
        .then(({ userBranchInfo, vcsInfoList }) => commit('findProfileBranch', { session, userBranchInfo, vcsInfoList }))
    },
    saveProfileBranch: ({ state, commit }, { session, userBranchInfo }) => {
      return Api.getSharedInstance().saveProfileBranch(userBranchInfo, session)
    }
  },
  mutations: {
    findProfileBranch: (state, { session, userBranchInfo, vcsInfoList }) => {
      state.session = session
      state.userBranchInfo = userBranchInfo
      state.vcsInfoList = vcsInfoList.filter(vcsInfo => vcsInfo.type.value === userBranchInfo.branchInfo.vcsType.value)
    }
  }
}
