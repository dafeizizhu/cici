class UserInfo {
  static from (obj) {
    return Promise.resolve(new UserInfo(obj || {}))
  }
  constructor ({ id, yyuid, name, description }) {
    this.id = id || ''
    this.yyuid = yyuid || ''
    this.name = name || ''
    this.description = description || ''
  }
}

module.exports = UserInfo
