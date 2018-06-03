/* eslint camelcase: "off" */

const { UserDAO, BranchDAO, VCSDAO } = require('../dao')

const UserInfo = require('../dto/user-info')
const BranchInfo = require('../dto/branch-info')
const VCSInfo = require('../dto/vcs-info')

const userInfoFrom = obj => {
  if (obj.hasOwnProperty('userInfo')) {
    return Promise.resolve(obj.userInfo)
  } else if (obj.hasOwnProperty('user_id')) {
    return UserDAO.getSharedInstance().findUserById(obj.user_id)
      .then(user => UserInfo.from(user))
  } else {
    return UserInfo.from()
  }
}

const branchInfoFrom = obj => {
  if (obj.hasOwnProperty('branchInfo')) {
    return Promise.resolve(obj.branchInfo)
  } else if (obj.hasOwnProperty('branch_id')) {
    return BranchDAO.getSharedInstance().findBranchById(obj.branch_id)
      .then(branch => BranchInfo.from(branch))
  } else {
    return BranchInfo.from()
  }
}

const vcsInfoFrom = obj => {
  if (obj.hasOwnProperty('vcsInfo')) {
    return Promise.resolve(obj.vcsInfo)
  } else if (obj.hasOwnProperty('vcs_id')) {
    return VCSDAO.getSharedInstance().findVCSById(obj.vcs_id)
      .then(vcs => VCSInfo.from(vcs))
  } else {
    return VCSInfo.from()
  }
}

class UserBranchInfo {
  static from (obj) {
    obj = obj || {}
    let ret = { id: obj.id }
    return userInfoFrom(obj)
      .then(userInfo => {
        ret.userInfo = userInfo
        return branchInfoFrom(obj)
      })
      .then(branchInfo => {
        ret.branchInfo = branchInfo
        return vcsInfoFrom(obj)
      })
      .then(vcsInfo => {
        ret.vcsInfo = vcsInfo
        return new UserBranchInfo(ret)
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
