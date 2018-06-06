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
  createProject ({ name, description, domain, owner_id }) {
    return Sqlite3Driver.getSharedInstance().run(`
      INSERT INTO project (name, description, owner_id, domain) VALUES (?, ?, ?, ?)
    `, [
      name, description, owner_id, domain
    ])
  }
  findProjectListByUserId (userId) {
    return Sqlite3Driver.getSharedInstance().all(`
      SELECT * FROM project WHERE owner_id = ?
      UNION ALL
      SELECT b.* FROM user_project a JOIN project b ON a.project_id = b.id WHERE a.user_id = ?
    `, [ userId, userId ])
  }
  findProjectList (userId) {
    return Sqlite3Driver.getSharedInstance().all(`
      SELECT * FROM project
    `)
  }
  findProjectById (projectId) {
    return Sqlite3Driver.getSharedInstance().get(`
      SELECT * FROM project WHERE id = ?
    `, projectId)
  }
  updateProject ({ id, name, description, domain }) {
    return Sqlite3Driver.getSharedInstance().run(`
      UPDATE project SET name = ?, description = ?, domain = ?
      WHERE id = ?
    `, [
      name, description, domain, id
    ])
  }
}

module.exports = ProjectDAO
