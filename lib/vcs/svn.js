let sharedInstance = null

class VCSSVN {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new VCSSVN()
    }
    return sharedInstance
  }
  fetchCommits (vcsUri, username, password) {
    return Promise.resolve({ vcsUri, username, password })
  }
}

module.exports = VCSSVN
