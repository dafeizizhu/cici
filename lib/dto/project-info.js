// const Api = require('../api')

const UserInfo = require('./user-info')

class ProjectInfo {
  static from (obj) {
    if (obj && obj.id) {
      return Promise.reject(new Error('not implement'))
    } else {
      return UserInfo.from({}).then(userInfo => new ProjectInfo({
        ownerInfo: userInfo
      }))
    }
  }
  constructor ({ id, name, description, ownerInfo, branchInfoList }) {
    this.id = id || ''
    this.name = name || '123'
    this.description = description || ''
    // TODO
    this.ownerInfo = ownerInfo || {}
    this.branchInfoList = branchInfoList || []
  }
}

module.exports = ProjectInfo
