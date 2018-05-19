/* eslint camelcase: "off" */

const Sqlite3Driver = require('./driver')

let sharedInstance = null

class UserBranchDAO {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new UserBranchDAO()
    }
    return sharedInstance
  }
  findUserBranchByUserIdAndBranchId (userId, branchId) {
    return Sqlite3Driver.getSharedInstance().get(`
      SELECT * from user_branch WHERE user_id = ? AND branch_id = ?
    `, [ userId, branchId ])
  }
  createUserBranch ({ user_id, branch_id, vcs_id }) {
    return Sqlite3Driver.getSharedInstance().run(`
      INSERT INTO user_branch (user_id, branch_id, vcs_id)
      VALUES (?, ?, ?)
    `, [ user_id, branch_id, vcs_id ])
  }
}

module.exports = UserBranchDAO
