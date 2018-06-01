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
    findAdmin: ({ store, commit }, { session }) => {
      return Api.getSharedInstance().findAdmin(session.user.id, session)
        .then(({ userInfoList, projectInfoList, userProjectInfoList }) => commit('findAdmin', { userInfoList, projectInfoList, userProjectInfoList, session }))
    },
    saveAdminProject: ({ store, commit }, { userId, projectIdList, session }) => {
      return Api.getSharedInstance().saveAdminProject(userId, projectIdList, session)
    },
    changeAdminProjectUser: ({ store, commit }, { userId, session }) => {
      return Api.getSharedInstance().findAdmin(userId, session)
        .then(({ userInfoList, projectInfoList, userProjectInfoList }) => commit('changeAdminProjectUser', { userInfoList, projectInfoList, userProjectInfoList, userId }))
    }
  },
  mutations: {
    findAdmin: (state, { userInfoList, projectInfoList, userProjectInfoList, session }) => {
      state.session = session
      state.userId = session.user.id
      state.userInfoList = userInfoList
      state.projectInfoList = projectInfoList
      state.ownedProjectInfoList = projectInfoList
        .filter(projectInfo => projectInfo.ownerInfo.id === session.user.id)

      let ownedProjectIdList = state.ownedProjectInfoList
        .map(projectInfo => projectInfo.id)
      let userProjectIdList = userProjectInfoList
        .map(userProjectInfo => userProjectInfo.projectInfo.id)

      state.projectTransfer = {
        model: ownedProjectIdList.concat(userProjectIdList),
        data: projectInfoList.map(projectInfo => ({
          key: projectInfo.id,
          label: projectInfo.name + ':' + projectInfo.ownerInfo.name,
          disabled: ownedProjectIdList.indexOf(projectInfo.id) >= 0
        }))
      }
    },
    changeAdminProjectUser: (state, { userId, userInfoList, projectInfoList, userProjectInfoList }) => {
      state.userId = userId
      state.userInfoList = userInfoList
      state.projectInfoList = projectInfoList
      state.ownedProjectInfoList = projectInfoList
        .filter(projectInfo => projectInfo.ownerInfo.id === userId)

      let ownedProjectIdList = state.ownedProjectInfoList
        .map(projectInfo => projectInfo.id)
      let userProjectIdList = userProjectInfoList
        .map(userProjectInfo => userProjectInfo.projectInfo.id)

      state.projectTransfer = {
        model: ownedProjectIdList.concat(userProjectIdList),
        data: projectInfoList.map(projectInfo => ({
          key: projectInfo.id,
          label: projectInfo.name + ':' + projectInfo.ownerInfo.name,
          disabled: ownedProjectIdList.indexOf(projectInfo.id) >= 0
        }))
      }
    }
  }
}
