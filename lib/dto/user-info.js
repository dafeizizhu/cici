class UserInfo {
  static from (obj) {
    obj = obj || {}
    return Promise.resolve(new UserInfo({
      id: obj.id,
      yyuid: obj.yyuid,
      name: obj.name,
      description: obj.description
    }))
  }
  constructor ({ id, yyuid, name, description }) {
    this.id = id
    this.yyuid = yyuid
    this.name = name
    this.description = description
  }
}

module.exports = UserInfo
