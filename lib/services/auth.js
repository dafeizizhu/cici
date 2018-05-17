const { UserDAO } = require('../dao')

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
    return UserDAO.getSharedInstance().createUser(userInfo.toUser())
      .then(user => UserInfo.from(user))
  }
}

module.exports = AuthService
