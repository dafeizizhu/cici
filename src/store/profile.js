import api from 'api'

export default {
  namespaced: true,
  state: () => ({
    id: '',
    vcsList: [{
      id: '',
      description: '',
      type: '',
      username: '',
      password: ''
    }],
    projectList: [{
      id: '',
      vcsId: '',
      name: '',
      descripton: ''
    }]
  }),
  actions: {
    findProfile: ({ state, commit }, { id }) => {
      let ret = { id }
      return api.findVCSListByUserId(id).then(vcsList => {
        ret = Object.assign({}, ret, { vcsList })
        return api.findProjectListByUserId(id)
      }).then(projectList => {
        return commit('findProfile', Object.assign({}, ret, { projectList }))
      })
    },
    saveProfile: ({ state, commit }) => {
      let profile = JSON.parse(JSON.stringify(state))
      return api.findVCSListByUserId(profile.id).then(vcsList => {
        return Promise.all(profile.vcsList.map(vcs => {
          if (typeof vcs.id === 'string') {
            return api.createVCS(vcs.type, vcs.description, vcs.username, vcs.password, profile.id)
          } else {
            let index = vcsList.map(vcs => vcs.id).indexOf(vcs.id)
            if (index >= 0) {
              vcsList.splice(index, 1)
              return api.updateVCS(vcs.id, vcs.type, vcs.description, vcs.username, vcs.password, profile.id)
            } else {
              return Promise.resolve()
            }
          }
        })).then(() => Promise.all(vcsList.map(vcs => api.removeVCS(vcs.id))))
      })
    }
  },
  mutations: {
    findProfile: (state, { id, vcsList, projectList }) => {
      state.id = id
      state.vcsList = vcsList
      state.projectList = projectList
    },
    addVCS: state => {
      state.vcsList = [...state.vcsList, {
        id: 'vcs_' + new Date().valueOf(),
        description: '111',
        type: '1',
        username: '111',
        password: '111'
      }]
    },
    removeVCS: (state, { vcsId }) => {
      let index = state.vcsList.map(vcs => vcs.id).indexOf(vcsId)
      state.vcsList = [...state.vcsList.slice(0, index), ...state.vcsList.slice(index + 1)]
    }
  }
}
