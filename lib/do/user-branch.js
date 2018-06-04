/* eslint camelcase: "off" */

class UserBranch {
  static from (obj) {
    obj = obj || {}
    return new UserBranch({
      id: obj.id,
      user_id: obj.userInfo.id,
      branch_id: obj.branchInfo.id,
      vcs_id: obj.vcsInfo.id
    })
  }
  constructor ({ id, user_id, branch_id, vcs_id }) {
    this.id = id
    this.user_id = user_id
    this.branch_id = branch_id
    this.vcs_id = vcs_id
  }
}

module.exports = UserBranch
