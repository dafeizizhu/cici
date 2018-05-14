const Sqlite3DAO = require('./sqlite3')

exports.getInstance = () => {
  return Sqlite3DAO.getSharedInstance()
}
