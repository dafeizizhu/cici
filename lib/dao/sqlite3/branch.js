/* eslint camelcase: "off" */

const Sqlite3Driver = require('./driver')

let sharedInstance = null

class BranchDAO {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new BranchDAO()
    }
    return sharedInstance
  }
  findBranchById (id) {
    return Sqlite3Driver.getSharedInstance().get(`
      SELECT * FROM branch WHERE id = ?
    `, id)
  }
  createBranch ({ name, description, vcs_type, vcs_uri, project_id, owner_id }) {
    return Sqlite3Driver.getSharedInstance().run(`
      INSERT INTO branch (name, description, vcs_type, vcs_uri, project_id, owner_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      name, description, vcs_type, vcs_uri, project_id, owner_id
    ]).then(context => ({
      id: context.lastID, name, description, vcs_type, vcs_uri, project_id
    }))
  }
  findBranchListByUserId (userId) {
    return Sqlite3Driver.getSharedInstance().all(`
      SELECT * FROM branch WHERE project_id IN
      (
        SELECT id FROM project WHERE owner_id = ?
        UNION ALL
        SELECT project_id FROM user_project WHERE user_id = ?
      )
    `, [ userId, userId ])
  }
  findBranchListByProjectId (projectId) {
    return Sqlite3Driver.getSharedInstance().all(`
      SELECT * FROM branch WHERE project_id = ?
    `, projectId)
  }
  updateBranch ({ id, name, description, vcs_type, vcs_uri, project_id }) {
    return Sqlite3Driver.getSharedInstance().run(`
      UPDATE branch SET name = ?, description = ?, vcs_type = ?, vcs_uri = ?, project_id = ?
      WHERE id = ?
    `, [
      name, description, vcs_type, vcs_uri, project_id, id
    ])
  }
  findBranchByIdAndUserId (branchId, userId) {
    return Sqlite3Driver.getSharedInstance().get(`
      SELECT * FROM branch WHERE project_id IN
      (
        SELECT id FROM project WHERE owner_id = ?
        UNION ALL
        SELECT project_id FROM user_project WHERE user_id = ?
      )
      AND id = ?
    `, [ userId, userId, branchId ])
  }
}

module.exports = BranchDAO
