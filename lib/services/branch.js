const { VCSDAO, BranchDAO, UserBranchDAO } = require('../dao')

const Branch = require('../do/branch')

const VCSInfo = require('../dto/vcs-info')
const UserBranchInfo = require('../dto/user-branch-info')
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
  findBranch (branchId, userId) {
    let model = { vcsTypes: VCSType.all() }
    return ProjectService.getSharedInstance().findProjects(userId).then(({ projectInfoList }) => {
      model.projectInfoList = projectInfoList
      return VCSDAO.getSharedInstance().findVCSListByUserId(userId)
    }).then(vcsList => {
      return Promise.all(vcsList.map(vcs => VCSInfo.from(vcs)))
    }).then(vcsInfoList => {
      model.vcsInfoList = vcsInfoList
      return UserBranchDAO.getSharedInstance().findUserBranchByUserIdAndBranchId(userId, branchId)
    }).then(userBranch => {
      return UserBranchInfo.from(userBranch)
    }).then(({ branchInfo, userInfo, vcsInfo }) => {
      model.branchInfo = Object.assign({}, branchInfo, { vcsInfo })
      return model
    })
  }
  saveBranch (branchInfo, userId) {
    if (branchInfo.id) {
      throw new Error('not implemented')
    } else {
      return BranchDAO.getSharedInstance().createBranch(Branch.from(branchInfo))
        .then(branch => UserBranchDAO.getSharedInstance().createUserBranch({
          user_id: userId,
          branch_id: branch.id,
          vcs_id: branchInfo.vcsInfo.id
        }))
    }
  }
  findBranches (userId) {
    let model = {}
    return ProjectService.getSharedInstance().findProjects(userId)
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
