const { VCSDAO, BranchDAO } = require('../dao')

const VCSInfo = require('../dto/vcs-info')
const BranchInfo = require('../dto/branch-info')

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
    let model = {}
    return ProjectService.findProjects(userId).then(projectInfoList => {
      model.projectInfoList = projectInfoList
      return VCSDAO.getSharedInstance().findVCSListByUserId(userId)
    }).then(vcsList => {
      return Promise.all(vcsList.map(vcs => VCSInfo.from(vcs)))
    }).then(vcsInfoList => {
      model.vcsInfoList = vcsInfoList
      return BranchDAO.getSharedInstance().findBranchById(branchId)
    }).then(branch => {
      return BranchInfo.from(branch)
    }).then(branchInfo => {
      model.bracnInfo = branchInfo
      return model
    })
  }
}

module.exports = BranchService
