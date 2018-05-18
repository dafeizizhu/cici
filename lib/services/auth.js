const { UserDAO } = require('../dao')

const User = require('../do/user')

const UserInfo = require('../dto/user-info')

let sharedInstance = null

class AuthService {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new AuthService()
    }
    return sharedInstance
  }
  findUserByYYuid (yyuid) {
    return UserDAO.getSharedInstance().findUserByYYuid(yyuid)
  }
  createUser (userInfo) {
    return UserDAO.getSharedInstance().createUser(User.from(userInfo))
      .then(user => UserInfo.from(user))
  }
}

module.exports = AuthService
