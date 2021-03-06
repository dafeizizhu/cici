/* eslint camelcase: "off" */

const Sqlite3Driver = require('./driver')

let sharedInstance = null

class DeployDAO {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new DeployDAO()
    }
    return sharedInstance
  }
  findDeployById (deployId) {
    return Sqlite3Driver.getSharedInstance().get(`
      SELECT * FROM deploy WHERE id = ?
    `, deployId)
  }
  createDeploy ({ project_id, main_branch_id, owner_id, name, description, dist }) {
    return Sqlite3Driver.getSharedInstance().run(`
      INSERT INTO deploy (project_id, main_branch_id, owner_id, name, description, dist)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [ project_id, main_branch_id, owner_id, name, description, dist ])
  }
  updateDeploy ({ id, project_id, main_branch_id, owner_id, name, description, dist }) {
    return Sqlite3Driver.getSharedInstance().run(`
      UPDATE
        deploy
      SET
        project_id = ?,
        main_branch_id = ?,
        owner_id = ?,
        name = ?,
        description = ?,
        dist = ?
      WHERE
        id = ?
    `, [ project_id, main_branch_id, owner_id, name, description, dist, id ])
  }
  findDeployListByProjectId (projectId) {
    return Sqlite3Driver.getSharedInstance().all(`
      SELECT * FROM deploy WHERE project_id = ?
    `, projectId)
  }
  deleteDeployById (deployId) {
    return Sqlite3Driver.getSharedInstance().run(`
      DELETE FROM deploy WHERE id = ?
    `, deployId)
  }
}

module.exports = DeployDAO
