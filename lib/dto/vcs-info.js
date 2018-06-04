/* eslint camelcase: "off" */

const VCSType = require('../enum/vcs-type')

class VCSInfo {
  static from (obj) {
    obj = obj || {}
    return Promise.resolve(new VCSInfo({
      id: obj.id,
      type: VCSType.fromValue(obj.type),
      description: obj.description,
      username: obj.username,
      password: obj.password,
      // TODO
      userInfo: obj.userInfo ? obj.userInfo : { id: obj.user_id }
    }))
  }
  constructor ({ id, type, description, username, password, userInfo }) {
    this.id = id
    this.type = type
    this.description = description
    this.username = username
    this.password = password
    this.userInfo = userInfo
  }
}

module.exports = VCSInfo
