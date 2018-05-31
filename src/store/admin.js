const Api = require('api')

export default {
  namespaced: true,
  state: () => ({
    projectInfoList: [],
    projectTransfer: {
      model: [],
      data: []
    }
  }),
  actions: {
    findAdmin: ({ state, commit }, { session }) => {
      return Api.getSharedInstance().findAdmin(session.user.id)
        .then(({ projectInfoList, userProjectInfoList }) => commit('findAdmin', { projectInfoList, userProjectInfoList }))
    }
  },
  mutations: {
    findAdmin: (state, { projectInfoList, userProjectInfoList }) => {
      state.projectInfoList = projectInfoList
    }
  }
}
