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
  findProfile (session) {
    return ProfileService.getSharedInstance().findProfile(session)
  }
  findProject (projectId, session) {
    return ProjectService.getSharedInstance().findProject(projectId, session)
  }
  saveProject (projectInfo, session) {
    return ProjectService.getSharedInstance().saveProject(projectInfo, session)
  }
  findProjects (session) {
    return ProjectService.getSharedInstance().findProjects(session)
  }
  findBranch (branchId, session) {
    return BranchService.getSharedInstance().findBranch(branchId, session)
  }
  saveBranch (branchInfo, session) {
    return BranchService.getSharedInstance().saveBranch(branchInfo, session)
  }
  findBranches (session) {
    return BranchService.getSharedInstance().findBranches(session)
  }
  deleteProject (projectId, session) {
    return ProjectService.getSharedInstance().deleteProject(projectId, session)
  }
  findAdmin (userId, session) {
    return AdminService.getSharedInstance().findAdmin(userId, session)
  }
  saveAdminProject (userId, projectIdList, session) {
    return AdminService.getSharedInstance().saveAdminProject(userId, projectIdList, session)
  }
}

module.exports = ServerApi
