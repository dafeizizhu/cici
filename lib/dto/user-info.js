class UserInfo {
  static from (obj) {
    return Promise.resolve(new UserInfo(obj || {}))
  }
  constructor ({ id, yyuid, name, description }) {
    this.id = id
    this.yyuid = yyuid
    this.name = name
    this.description = description
  }
  toUser () {
    return {
      id: this.id,
      yyuid: this.yyuid,
      name: this.name,
      description: this.description
    }
  }
}

module.exports = UserInfo
