const Sqlite3Driver = require('./driver')

let sharedInstance = null

class UserDAO {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new UserDAO()
    }
    return sharedInstance
  }
  findUserByYYuid (yyuid) {
    return Sqlite3Driver.getSharedInstance().get(`SELECT * FROM user WHERE yyuid = ?`, yyuid)
  }
  findUserById (id) {
    return Sqlite3Driver.getSharedInstance().get(`SELECT * FROM user WHERE id = ?`, id)
  }
  createUser ({ yyuid, name, description }) {
    return Sqlite3Driver.getSharedInstance().run(`INSERT INTO user (yyuid, name, description) VALUES (?, ?, ?)`, [yyuid, name, description])
  }
}

module.exports = UserDAO
