const { BranchDAO, CommitDAO } = require('../dao')

const BranchInfo = require('../dto/branch-info')
const CommitInfo = require('../dto/commit-info')

let sharedInstance = null

class CommitService {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new CommitService()
    }
    return sharedInstance
  }
  findCommits (branchId, session) {
    let ret = {}
    return BranchDAO.getSharedInstance().findBranchById(branchId)
      .then(branch => {
        if (!branch.id) throw new Error('branchId ' + branchId + ' is invalid')
        return BranchInfo.from(branch)
      })
      .then(branchInfo => {
        ret.branchInfo = branchInfo
        return CommitDAO.getSharedInstance().findCommitListByBranchId(branchId)
      })
      .then(commitList => Promise.all(commitList.map(commit => CommitInfo.from(Object.assign(commit, {
        branchInfo: ret.branchInfo
      })))))
      .then(commitInfoList => {
        ret.commitInfoList = commitInfoList
        return ret
      })
  }
}

module.exports = CommitService
