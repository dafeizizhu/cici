const Api = require('api')

export default {
  namespaced: true,
  state: () => ({
    branchInfoList: [],
    deployInfo: {
      projectInfo: {}
    }
  }),
  actions: {
    findDeploy: ({ state, commit }, { session, projectId, deployId }) => {
      return Api.getSharedInstance().findDeploy(deployId, projectId, session)
        .then(({ branchInfoList, deployInfo }) => commit('findDeploy', { branchInfoList, deployInfo, session }))
    },
    saveDeploy: ({ state, commit }, { session, deployInfo }) => {
      return Api.getSharedInstance().saveDeploy(deployInfo, session)
    }
  },
  mutations: {
    findDeploy: (state, { branchInfoList, deployInfo, session }) => {
      state.session = session
      state.branchInfoList = branchInfoList
      state.deployInfo = deployInfo
    }
  }
}
