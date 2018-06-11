const Api = require('api')

export default {
  namespaced: true,
  state: () => ({
    projectInfo: {
      ownerInfo: {}
    },
    branchInfoList: [],
    deployInfoList: []
  }),
  actions: {
    findProject: ({ state, commit }, { projectId, session }) => {
      return Api.getSharedInstance().findProject(projectId, session)
        .then(({ projectInfo, branchInfoList, deployInfoList }) => {
          if (!projectInfo.id) {
            projectInfo = Object.assign({}, projectInfo, { ownerInfo: session.user })
          }
          commit('findProject', { session, projectInfo, branchInfoList, deployInfoList })
        })
    },
    saveProject: ({ state, commit }, { projectInfo, session }) => {
      return Api.getSharedInstance().saveProject(projectInfo, session)
    }
  },
  mutations: {
    findProject: (state, { session, projectInfo, branchInfoList, deployInfoList }) => {
      state.session = session
      state.projectInfo = projectInfo
      state.branchInfoList = branchInfoList
      state.deployInfoList = deployInfoList
    }
  }
}
