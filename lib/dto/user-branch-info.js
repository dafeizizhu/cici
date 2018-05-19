/* eslint camelcase: "off" */

const { UserDAO, BranchDAO, VCSDAO } = require('../dao')

const UserInfo = require('../dto/user-info')
const BranchInfo = require('../dto/branch-info')
const VCSInfo = require('../dto/vcs-info')

class UserBranchInfo {
  static from (obj) {
    obj = obj || {}
    let ret = { id: obj.id }
    return UserDAO.getSharedInstance().findUserById(obj.user_id)
      .then(user => UserInfo.from(user))
      .then(userInfo => {
        ret.userInfo = userInfo
        return BranchDAO.getSharedInstance().findBranchById(obj.branch_id)
      })
      .then(branch => BranchInfo.from(branch))
      .then(branchInfo => {
        ret.branchInfo = branchInfo
        return VCSDAO.getSharedInstance().findVCSById(obj.vcs_id)
      })
      .then(vcs => VCSInfo.from(vcs))
      .then(vcsInfo => {
        ret.vcsInfo = vcsInfo
        return ret
      })
  }
  constructor ({ id, userInfo, branchInfo, vcsInfo }) {
    this.id = id
    this.userInfo = userInfo
    this.branchInfo = branchInfo
    this.vcsInfo = vcsInfo
  }
}

module.exports = UserBranchInfo
