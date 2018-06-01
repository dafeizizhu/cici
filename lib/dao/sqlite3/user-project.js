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
  findUserProjectByUserId (userId) {
    return Sqlite3Driver.getSharedInstance().all(`
      SELECT * FROM user_project WHERE user_id = ?
    `, userId)
  }
  createUserProject ({ user_id, project_id }) {
    return Sqlite3Driver.getSharedInstance().run(`
      INSERT INTO user_project (user_id, project_id)
      VALUES (?, ?)
    `, [ user_id, project_id ])
  }
  deleteUserProjectById (id) {
    return Sqlite3Driver.getSharedInstance().run(`
      DELETE FROM user_project WHERE id = ?
    `, id)
  }
}

module.exports = UserProjectDAO
