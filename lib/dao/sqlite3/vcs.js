/* eslint camelcase: "off" */

const Sqlite3Driver = require('./driver')

let sharedInstance = null

class VCSDAO {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new VCSDAO()
    }
    return sharedInstance
  }
  findVCSById (vcsId) {
    return Sqlite3Driver.getSharedInstance().get(`
      SELECT * FROM vcs WHERE id = ?
    `, vcsId)
  }
  findVCSListByUserId (userId) {
    return Sqlite3Driver.getSharedInstance().all(`
      SELECT * FROM vcs WHERE user_id = ?
    `, userId)
  }
  createVCS ({ type, description, username, password, user_id }) {
    return Sqlite3Driver.getSharedInstance().run(`
      INSERT INTO vcs (type, description, username, password, user_id) VALUES (?, ?, ?, ?, ?)
    `, [
      type, description, username, password, user_id
    ]).then(context => {
      return { id: context.lastID, type, description, username, password, user_id }
    })
  }
  updateVCS ({ id, type, description, username, password, user_id }) {
    return Sqlite3Driver.getSharedInstance().run(`
      UPDATE vcs SET type = ?, description = ?, username = ?, password = ?, user_id = ? WHERE id = ?
    `, [
      type, description, username, password, user_id, id
    ])
  }
  removeVCS (id) {
    return Sqlite3Driver.getSharedInstance().run(`
      DELETE FROM vcs WHERE id = ?
    `, id)
  }
}

module.exports = VCSDAO
