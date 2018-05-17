const Sqlite3Driver = require('./driver')

let sharedInstance = null

class ProjectDAO {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new ProjectDAO()
    }
    return sharedInstance
  }
  findProjectListByUserId (userId) {
    return Sqlite3Driver.getSharedInstance().all(`SELECT a.*, b.* FROM user_project a JOIN project b ON a.project_id = b.id WHERE a.user_id = ?`, userId)
  }
}

module.exports = ProjectDAO
