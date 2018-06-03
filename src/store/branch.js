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
    findBranch: ({ state, commit }, { session, branchId, projectId }) => {
      return Api.getSharedInstance().findBranch(branchId, session)
        .then(model => {
          if (!model.branchInfo.id) {
            model.branchInfo.projectInfo.id = Number(projectId) || ''
          }
          return commit('findBranch', Object.assign(model, { session }))
        })
    },
    saveBranch: ({ state, commit }, { branchInfo, session }) => {
      return Api.getSharedInstance().saveBranch(branchInfo, session)
    }
  },
  mutations: {
    findBranch: (state, { session, vcsTypes, projectInfoList, vcsInfoList, branchInfo }) => {
      state.session = session
      state.vcsTypes = vcsTypes
      state.projectInfoList = projectInfoList
      state.vcsInfoList = vcsInfoList
      state.branchInfo = branchInfo
    }
  }
}
