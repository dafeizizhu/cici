/* eslint camelcase: "off" */

class VCSInfo {
  static from (obj) {
    return Promise.resolve(new VCSInfo(obj || {}))
  }
  constructor ({ id, type, description, username, password, user_id }) {
    this.id = id
    this.type = type
    this.description = description
    this.username = username
    this.password = password
    this.userId = user_id
  }
}

module.exports = VCSInfo
