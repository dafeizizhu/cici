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
      return Api.getSharedInstance().findProject(projectId, session).then(({ projectInfo, branchInfoList }) => {
        if (!projectInfo.id) {
          projectInfo = Object.assign({}, projectInfo, { ownerInfo: session.user })
        }
        commit('findProject', { session, projectInfo, branchInfoList })
      })
    },
    saveProject: ({ state, commit }, { projectInfo, session }) => {
      return Api.getSharedInstance().saveProject(projectInfo, session)
    }
  },
  mutations: {
    findProject: (state, { session, projectInfo, branchInfoList }) => {
      state.session = session
      state.projectInfo = projectInfo
      state.branchInfoList = branchInfoList
    }
  }
}
