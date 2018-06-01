const { UserDAO } = require('../dao')

const UserInfo = require('./user-info')

class ProjectInfo {
  static from (obj) {
    if (obj && obj.id) {
      if (obj.hasOwnProperty('ownerInfo')) {
        return Promise.resolve(new ProjectInfo(Object.assign({}, obj)))
      } else {
        return UserDAO.getSharedInstance().findUserById(obj.owner_id)
          .then(user => UserInfo.from(user))
          .then(userInfo => new ProjectInfo(Object.assign({}, obj, {
            ownerInfo: userInfo
          })))
      }
    } else {
      return UserInfo.from({}).then(userInfo => new ProjectInfo({
        ownerInfo: userInfo
      }))
    }
  }
  constructor ({ id, name, description, ownerInfo }) {
    this.id = id || ''
    this.name = name || ''
    this.description = description || ''
    this.ownerInfo = ownerInfo || {}
  }
}

module.exports = ProjectInfo
