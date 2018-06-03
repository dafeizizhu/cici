/* eslint camelcase: "off" */

class User {
  static from (obj) {
    obj = obj || {}
    return new User({
      id: obj.id,
      yyuid: obj.yyuid,
      name: obj.name,
      descirption: obj.description
    })
  }
  constructor ({ id, yyuid, name, description }) {
    this.id = id
    this.yyuid = yyuid
    this.name = name
    this.description = description
  }
}

module.exports = User
