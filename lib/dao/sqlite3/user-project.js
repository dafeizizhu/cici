/* eslint camelcase: "off" */

const Sqlite3Driver = require('./driver')

let sharedInstance = null

class UserProjectDAO {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new UserProjectDAO()
    }
    return sharedInstance
  }
  findUserProjectListByProjectId (projectId) {
    return Sqlite3Driver.getSharedInstance().all(`
      SELECT * FROM user_project WHERE project_id = ?
    `, projectId)
  }
}

module.exports = UserProjectDAO
