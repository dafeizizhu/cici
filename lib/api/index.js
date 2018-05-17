const ProfileService = require('../services/profile')

let sharedInstance = null

class ServerApi {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new ServerApi()
    }
    return sharedInstance
  }
  findProfile (userId) {
    return ProfileService.getSharedInstance().findProfile(userId)
  }
}

module.exports = ServerApi
