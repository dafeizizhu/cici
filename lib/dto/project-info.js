const { UserDAO } = require('../dao')

const UserInfo = require('./user-info')

class ProjectInfo {
  static from (obj) {
    if (obj && obj.id) {
      return UserDAO.getSharedInstance().findUserById(obj.owner_id)
        .then(user => UserInfo.from(user))
        .then(userInfo => new ProjectInfo(Object.assign({}, obj, {
          ownerInfo: userInfo
        })))
    } else {
      return UserInfo.from({}).then(userInfo => new ProjectInfo({
        ownerInfo: userInfo
      }))
    }
  }
  constructor ({ id, name, description, ownerInfo, branchInfoList }) {
    this.id = id || ''
    this.name = name || ''
    this.description = description || ''
    this.ownerInfo = ownerInfo || {}
    this.branchInfoList = branchInfoList || []
  }
}

module.exports = ProjectInfo
