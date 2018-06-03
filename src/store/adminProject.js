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
    findAdminProject: ({ state, commit }, { session }) => {
      return Api.getSharedInstance().findAdminProject(session.user.id, session)
        .then(({ userInfoList, projectInfoList, userProjectInfoList }) => commit('findAdminProject', { userInfoList, projectInfoList, userProjectInfoList, session }))
    },
    saveAdminProject: ({ state, commit }, { userId, projectIdList, session }) => {
      return Api.getSharedInstance().saveAdminProject(userId, projectIdList, session)
    },
    changeAdminProjectUser: ({ state, commit }, { userId, session }) => {
      return Api.getSharedInstance().findAdminProject(userId, session)
        .then(({ userInfoList, projectInfoList, userProjectInfoList }) => commit('changeAdminProjectUser', { userInfoList, projectInfoList, userProjectInfoList, userId }))
    }
  },
  mutations: {
    findAdminProject: (state, { userInfoList, projectInfoList, userProjectInfoList, session }) => {
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
