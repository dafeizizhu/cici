const ProfileService = require('../services/profile')
const ProjectService = require('../services/project')
const BranchService = require('../services/branch')

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
  findBranch (branchId, userId) {
    return BranchService.getSharedInstance().findBranch(branchId, userId)
  }
}

module.exports = ServerApi
