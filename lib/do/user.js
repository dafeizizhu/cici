/* eslint camelcase: "off" */

class User {
  static from (obj) {
    return new User(obj || {})
  }
  constructor ({ id, yyuid, name, description }) {
    this.id = id || ''
    this.yyuid = yyuid || ''
    this.name = name || ''
    this.description = description || ''
  }
}

module.exports = User
