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
}

module.exports = DeployDAO
