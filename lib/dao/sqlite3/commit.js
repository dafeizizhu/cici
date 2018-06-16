const Sqlite3Driver = require('./driver')

let sharedInstance = null

class CommitDAO {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new CommitDAO()
    }
    return sharedInstance
  }
  findCommitListByBranchId (branchId) {
    return Sqlite3Driver.getSharedInstance().all(`
      SELECT * FROM cici_commit WHERE branch_id = ?
    `, branchId)
  }
}

module.exports = CommitDAO
