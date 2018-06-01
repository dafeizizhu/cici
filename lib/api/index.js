const ProfileService = require('../services/profile')
const ProjectService = require('../services/project')
const BranchService = require('../services/branch')
const AdminService = require('../services/admin')

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
  findProject (projectId, userId) {
    return ProjectService.getSharedInstance().findProject(projectId)
  }
  saveProject (projectInfo, userId) {
    return ProjectService.getSharedInstance().saveProject(projectInfo)
  }
  findProjects (userId) {
    return ProjectService.getSharedInstance().findProjects(userId)
  }
  findBranch (branchId, userId) {
    return BranchService.getSharedInstance().findBranch(branchId, userId)
  }
  saveBranch (branchInfo, userId) {
    return BranchService.getSharedInstance().saveBranch(branchInfo, userId)
  }
  findBranches (userId) {
    return BranchService.getSharedInstance().findBranches(userId)
  }
  deleteProject (projectId, userId) {
    return ProjectService.getSharedInstance().deleteProject(projectId, userId)
  }
  findAdmin (userId) {
    return AdminService.getSharedInstance().findAdmin(userId)
  }
  saveAdminProject (userId, projectIdList) {
    return AdminService.getSharedInstance().saveAdminProject(userId, projectIdList)
  }
}

module.exports = ServerApi
