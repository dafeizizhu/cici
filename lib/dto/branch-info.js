class BranchInfo {
  static from (obj) {
    return Promise.reject(new Error('not implemented'))
  }
  constructor ({ id }) {
    this.id = id
  }
}

module.exports = BranchInfo
