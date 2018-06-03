const { BranchDAO } = require('../dao')

const Branch = require('../do/branch')

const BranchInfo = require('../dto/branch-info')

const VCSType = require('../enum/vcs-type')

const ProjectService = require('./project')

let sharedInstance = null

class BranchService {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new BranchService()
    }
    return sharedInstance
  }
  findBranch (branchId, session) {
    let model = { vcsTypes: VCSType.all() }
    return ProjectService.getSharedInstance().findProjects(session).then(({ projectInfoList }) => {
      model.projectInfoList = projectInfoList
      return BranchDAO.getSharedInstance().findBranchById(branchId)
    }).then(branch => {
      return BranchInfo.from(branch)
    }).then(branchInfo => {
      model.branchInfo = branchInfo
      return model
    })
  }
  saveBranch (branchInfo, session) {
    if (branchInfo.id) {
      return BranchDAO.getSharedInstance().updateBranch(Branch.from(branchInfo))
    } else {
      return BranchDAO.getSharedInstance().createBranch(Branch.from(branchInfo))
    }
  }
  findBranches (session) {
    let userId = session.user.id
    let model = {}
    return ProjectService.getSharedInstance().findProjects(session)
      .then(({ projectInfoList }) => {
        model.projectInfoList = projectInfoList
        return BranchDAO.getSharedInstance().findBranchListByUserId(userId)
      })
      .then(branchList => Promise.all(branchList.map(branch => BranchInfo.from(branch))))
      .then(branchInfoList => {
        model.branchInfoList = branchInfoList
        return model
      })
  }
}

module.exports = BranchService
