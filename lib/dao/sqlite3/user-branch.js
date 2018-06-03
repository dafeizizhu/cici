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
  findUserBranchListByProjectId (projectId) {
    return Sqlite3Driver.getSharedInstance().all(`
      SELECT * FROM user_branch WHERE branch_id IN
      (
        SELECT branch_id FROM user_branch
        WHERE branch_id IN
        (
          SELECT branch_id FROM branch
          WHERE project_id = ?
        )
      )
    `, projectId)
  }
  updateUserBranch ({ user_id, branch_id, vcs_id }) {
    return Sqlite3Driver.getSharedInstance().run(`
      UPDATE user_branch SET vcs_id = ?
      WHERE user_id = ? AND branch_id = ?
    `, [
      vcs_id, user_id, branch_id
    ])
  }
  deleteUserBranchByVCSId (vcsId) {
    return Sqlite3Driver.getSharedInstance().run(`
      DELETE FROM user_branch WHERE vcs_id = ?
    `, vcsId)
  }
}

module.exports = UserBranchDAO
