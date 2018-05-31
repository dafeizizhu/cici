const Api = require('api')

export default {
  namespaced: true,
  state: () => ({
    projectInfo: {
      id: '',
      name: '',
      description: '',
      ownerInfo: {
        id: '',
        yyuid: '',
        name: '',
        description: ''
      }
    },
    branchInfoList: [{
      id: '',
      projectId: '',
      vcsId: '',
      name: '',
      description: '',
      vcsType: '',
      vcsUri: ''
    }]
  }),
  actions: {
    findProject: ({ state, commit }, { projectId, session }) => {
      return Api.getSharedInstance().findProject(projectId).then(({ projectInfo, branchInfoList }) => {
        if (!projectInfo.id) {
          projectInfo = Object.assign({}, projectInfo, { ownerInfo: session.user })
        }
        commit('findProject', { projectInfo, branchInfoList })
      })
    },
    saveProject: ({ state, commit }, { projectInfo }) => {
      return Api.getSharedInstance().saveProject(projectInfo)
    }
  },
  mutations: {
    findProject: (state, { projectInfo, branchInfoList }) => {
      state.projectInfo = projectInfo
      state.branchInfoList = branchInfoList
    }
  }
}
