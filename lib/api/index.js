const ProfileService = require('../services/profile')
const ProjectService = require('../services/project')

let sharedInstance = null

class ServerApi {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new ServerApi()
    }
    return sharedInstance
  }
  findProfile (userId) {
    return ProfileService.getSharedInstance().findProfile(userId)
  }
  findProject (projectId) {
    return ProjectService.getSharedInstance().findProject(projectId)
  }
  saveProject (projectInfo) {
    return ProjectService.getSharedInstance().saveProject(projectInfo)
  }
  findProjects (userId) {
    return ProjectService.getSharedInstance().findProjects(userId)
  }
}

module.exports = ServerApi
