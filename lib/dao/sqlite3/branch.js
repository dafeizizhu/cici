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
    return Sqlite3Driver.getSharedInstance().get(`SELECT * FROM branch WHERE id = ?`, id)
  }
  createBranch ({ name, description, vcs_type, vcs_uri, project_id }) {
    return Sqlite3Driver.getSharedInstance().run(`
      INSERT INTO branch (name, description, vcs_type, vcs_uri, project_id)
      VALUES (?, ?, ?, ?, ?)
    `, [
      name, description, vcs_type, vcs_uri, project_id
    ]).then(context => ({
      id: context.lastID, name, description, vcs_type, vcs_uri, project_id
    }))
  }
  findBranchListByUserId (userId) {
  }
}

module.exports = BranchDAO
