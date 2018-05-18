const Api = require('api')

export default {
  namespaced: true,
  state: () => ({
    projectInfoList: [{
      id: '1',
      name: '111',
      description: '111',
      ownerInfo: {
        id: '',
        yyuid: '',
        name: '111',
        description: ''
      }
    }]
  }),
  actions: {
    findProjects: ({ state, commit }, { userId }) => {
      return Api.getSharedInstance().findProjects(userId)
        .then(({ projectInfoList }) => commit('findProjects', { projectInfoList }))
    }
  },
  mutations: {
    findProjects: (state, { projectInfoList }) => {
      state.projectInfoList = projectInfoList
    }
  }
}
