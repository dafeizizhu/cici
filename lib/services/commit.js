const assert = require('assert')
const { BranchDAO, CommitDAO, UserBranchDAO, VCSDAO } = require('../dao')

const BranchInfo = require('../dto/branch-info')
const CommitInfo = require('../dto/commit-info')

const vcsFactory = require('../vcs/factory')

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
  fetchCommits (branchId, session) {
    let vcsType, vcsUri, username, password
    return BranchDAO.getSharedInstance().findBranchById(branchId)
      .then(branch => {
        assert(branch && branch.id, 'invalid branch id')
        vcsUri = branch.vcs_uri
        vcsType = branch.vcs_type
        return UserBranchDAO.getSharedInstance().findUserBranchByUserIdAndBranchId(session.user.id, branch.id)
      })
      .then(userBranch => {
        assert(userBranch && userBranch.id, 'branch not authorized')
        return VCSDAO.getSharedInstance().findVCSById(userBranch.vcs_id)
      })
      .then(vcs => {
        assert(vcs && vcs.id, 'vcs is not configurated')
        username = vcs.username
        password = vcs.password
        let vcsDriver = vcsFactory.getInstance(vcsType)
        assert(vcsDriver, 'vcs is not supported')
        return vcsDriver.fetchCommits(vcsUri, username, password)
      })
  }
}

module.exports = CommitService
