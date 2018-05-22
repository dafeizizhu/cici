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
    },
    deleteProject: ({ state, commit }, { userId, projectId }) => {
      return Api.getSharedInstance().deleteProject(projectId, userId)
        .then(ret => {
          console.info('预删除', ret)
          commit('deleteProject', { projectId })
        })
    }
  },
  mutations: {
    findProjects: (state, { projectInfoList }) => {
      state.projectInfoList = projectInfoList
    },
    deleteProject: (state, { projectId }) => {
      let index = state.projectInfoList.map(projectInfo => projectInfo.id).indexOf(projectId)
      if (index >= 0) {
        state.projectInfoList = [
          ...state.projectInfoList.slice(0, index),
          ...state.projectInfoList.slice(index + 1)
        ]
      }
    }
  }
}
