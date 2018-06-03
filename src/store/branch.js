const Api = require('api')

export default {
  namespaced: true,
  state: () => ({
    projectInfoList: [],
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
    findBranch: ({ state, commit }, { session, branchId, projectId }) => {
      return Api.getSharedInstance().findBranch(branchId, session)
        .then(model => {
          if (!model.branchInfo.id) {
            model.branchInfo.projectInfo.id = Number(projectId) || ''
            model.branchInfo.ownerInfo = session.user
          }
          return commit('findBranch', Object.assign(model, { session }))
        })
    },
    saveBranch: ({ state, commit }, { branchInfo, session }) => {
      return Api.getSharedInstance().saveBranch(branchInfo, session)
    }
  },
  mutations: {
    findBranch: (state, { session, vcsTypes, projectInfoList, branchInfo }) => {
      state.session = session
      state.vcsTypes = vcsTypes
      state.projectInfoList = projectInfoList
      state.branchInfo = branchInfo
    }
  }
}
