const { UserDAO } = require('../dao')

const UserInfo = require('./user-info')

const ownerInfoFrom = obj => {
  if (obj.hasOwnProperty('ownerInfo')) {
    return Promise.resolve(obj.ownerInfo)
  } else if (obj.hasOwnProperty('owner_id')) {
    return UserDAO.getSharedInstance().findUserById(obj.owner_id)
      .then(user => UserInfo.from(user))
  } else {
    return UserInfo.from()
  }
}

class ProjectInfo {
  static from (obj) {
    obj = obj || {}
    return ownerInfoFrom(obj)
      .then(ownerInfo => {
        return new ProjectInfo({
          id: obj.id,
          ownerInfo,
          name: obj.name,
          description: obj.description
        })
      })
  }
  constructor ({ id, ownerInfo, name, description }) {
    this.id = id || ''
    this.ownerInfo = ownerInfo || {}
    this.name = name || ''
    this.description = description || ''
  }
}

module.exports = ProjectInfo
