const { BranchDAO } = require('../dao')

const BranchInfo = require('./branch-info')

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

class CommitInfo {
  static from (obj) {
    obj = obj || {}
    return branchInfoFrom(obj)
      .then(branchInfo => new CommitInfo({
        id: obj.id,
        branchInfo,
        key: obj.key,
        author: obj.author,
        message: obj.message
      }))
  }
  constructor ({ id, branchInfo, key, author, message }) {
    this.id = id
    this.branchInfo = branchInfo
    this.key = key
    this.author = author
    this.message = message
  }
}

module.exports = CommitInfo
