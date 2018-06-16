const ProfileService = require('../services/profile')
const ProjectService = require('../services/project')
const BranchService = require('../services/branch')
const AdminService = require('../services/admin')
const DeployService = require('../services/deploy')
const CommitService = require('../services/commit')

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
  findAdminProject (userId, session) {
    return AdminService.getSharedInstance().findAdminProject(userId, session)
  }
  saveAdminProject (userId, projectIdList, session) {
    return AdminService.getSharedInstance().saveAdminProject(userId, projectIdList, session)
  }
  findProfileVCS (vcsId, session) {
    return ProfileService.getSharedInstance().findProfileVCS(vcsId, session)
  }
  saveProfileVCS (vcsInfo, session) {
    return ProfileService.getSharedInstance().saveProfileVCS(vcsInfo, session)
  }
  deleteProfileVCS (vcsId, session) {
    return ProfileService.getSharedInstance().deleteProfileVCS(vcsId, session)
  }
  findProfileBranch (branchId, session) {
    return ProfileService.getSharedInstance().findProfileBranch(branchId, session)
  }
  saveProfileBranch (userBranchInfo, session) {
    return ProfileService.getSharedInstance().saveProfileBranch(userBranchInfo, session)
  }
  findDeploy (deployId, projectId, session) {
    return DeployService.getSharedInstance().findDeploy(deployId, projectId, session)
  }
  saveDeploy (deployInfo, session) {
    return DeployService.getSharedInstance().saveDeploy(deployInfo, session)
  }
  deleteDeploy (deployId, session) {
    return DeployService.getSharedInstance().deleteDeploy(deployId, session)
  }
  findCommits (branchId, session) {
    return CommitService.getSharedInstance().findCommits(branchId, session)
  }
}

module.exports = ServerApi
