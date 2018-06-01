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
    findProjects: ({ state, commit }, { session }) => {
      return Api.getSharedInstance().findProjects(session)
        .then(({ projectInfoList }) => commit('findProjects', { session, projectInfoList }))
    },
    deleteProject: ({ state, commit }, { session, projectId }) => {
      return Api.getSharedInstance().deleteProject(projectId, session)
        .then(ret => {
          console.info('预删除', ret)
          commit('deleteProject', { projectId })
        })
    }
  },
  mutations: {
    findProjects: (state, { session, projectInfoList }) => {
      state.session = session
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
