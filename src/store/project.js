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
    },
    deleteDeploy: ({ state, commit }, { deployId, session }) => {
      return Api.getSharedInstance().deleteDeploy(deployId, session)
        .then(_ => commit('deleteDeploy', { deployId }))
    }
  },
  mutations: {
    findProject: (state, { session, projectInfo, branchInfoList, deployInfoList }) => {
      state.session = session
      state.projectInfo = projectInfo
      state.branchInfoList = branchInfoList
      state.deployInfoList = deployInfoList
    },
    deleteDeploy: (state, { deployId }) => {
      let index = state.deployInfoList
        .map(deployInfo => deployInfo.id)
        .indexOf(deployId)

      state.deployInfoList = [
        ...state.deployInfoList.slice(0, index),
        ...state.deployInfoList.slice(index + 1)
      ]
    }
  }
}
