/* eslint camelcase: "off" */

const Sqlite3Driver = require('./driver')

let sharedInstance = null

class ProjectDAO {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new ProjectDAO()
    }
    return sharedInstance
  }
  createProject ({ name, description, owner_id }) {
    return Sqlite3Driver.getSharedInstance().run(`INSERT INTO project (name, description, owner_id) VALUES (?, ?, ?)`, [
      name, description, owner_id
    ])
  }
  findProjectListByUserId (userId) {
    return Sqlite3Driver.getSharedInstance().all(`
      SELECT * FROM project WHERE owner_id = ?
      UNION ALL
      SELECT b.* FROM user_project a JOIN project b ON a.project_id = b.id WHERE a.user_id = ?
    `, [ userId, userId ])
  }
  findProjectById (projectId) {
    return Sqlite3Driver.getSharedInstance().get(`SELECT * FROM project WHERE id = ?`, projectId)
  }
}

module.exports = ProjectDAO
