/* eslint camelcase: "off" */

class VCS {
  static from (obj) {
    obj = obj || {}
    return new VCS({
      id: obj.id,
      type: obj.type.value,
      description: obj.description,
      username: obj.username,
      password: obj.password,
      user_id: obj.userInfo.id
    })
  }
  constructor ({ id, type, description, username, password, user_id }) {
    this.id = id
    this.type = type
    this.description = description
    this.username = username
    this.password = password
    this.user_id = user_id
  }
}

module.exports = VCS
