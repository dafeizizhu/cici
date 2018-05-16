const path = require('path')
const sqlite3 = require('sqlite3')
const { EventEmitter } = require('events')
const async = require('async')

let sharedInstance = null

const DB_FILE_NAME = path.join(process.env.SRC_HOME || path.join(__dirname, '../..'), 'db/cici.sqlite3')

class Sqlite3DAO {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new Sqlite3DAO()
    }
    return sharedInstance
  }
  constructor () {
    this.db = new sqlite3.Database(DB_FILE_NAME, error => {
      if (!error) {
        this.createTable()
      } else {
        console.warn('createDatabase error', error)
        this.ee.emit('initError')
      }
    })
    this.ee = new EventEmitter()
    this.inited = false
    this.isError = false
  }
  createTable () {
    async.each([`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        yyuid INTEGER NOT NULL,
        name TEXT NOT NULL,
        description TEXT DEFAULT ''
      );
    `, `
      CREATE TABLE IF NOT EXISTS vcs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type INTEGER NOT NULL,
        description TEXT DEFAULT '',
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        user_id INTEGER NOT NULL
      );
    `, `
      CREATE TABLE IF NOT EXISTS user_project (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        project_id INTEGER NOT NULL,
        vcs_id INTEGER
      );
    `, `
      CREATE TABLE IF NOT EXISTS project (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        owner_id INTEGER NOT NULL
      );
    `], (sql, cb) => {
      this.db.run(sql, cb)
    }, error => {
      if (!error) {
        console.info('createTable success')
        this.inited = true
        this.ee.emit('inited')
      } else {
        console.warn('createTable error', error)
        this.isError = true
        this.ee.emit('initError')
      }
    })
  }
  init () {
    if (this.inited) {
      return Promise.resolve()
    } else if (this.isError) {
      return Promise.reject(new Error('not inited'))
    } else {
      return new Promise((resolve, reject) => {
        this.ee.once('inited', () => resolve())
        this.ee.once('initError', error => reject(error))
      })
    }
  }

  // User
  findUserByYYuid (yyuid) {
    return this.init().then(() => new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM user WHERE yyuid = ?`, yyuid, (error, row) => {
        if (error) reject(error)
        else resolve(row)
      })
    }))
  }
  createUser (yyuid, name, description) {
    return this.init().then(() => new Promise((resolve, reject) => {
      this.db.run(`INSERT INTO user (yyuid, name, description) VALUES (?, ?, ?)`, [yyuid, name, description], function (error) {
        if (error) {
          reject(error)
        } else {
          resolve({
            id: this.lastID, yyuid, name, description
          })
        }
      })
    }))
  }

  // VCS
  findVCSListByUserId (userId) {
    return this.init().then(() => new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM vcs WHERE user_id = ?`, userId, (error, rows) => {
        if (error) reject(error)
        else resolve(rows)
      })
    }))
  }
  createVCS (type, description, username, password, userId) {
    return this.init().then(() => new Promise((resolve, reject) => {
      this.db.run(`INSERT INTO vcs (type, description, username, password, user_id) VALUES (?, ?, ?, ?, ?)`, [
        type, description, username, password, userId
      ], function (error) {
        if (error) {
          reject(error)
        } else {
          resolve({
            id: this.lastID, type, description, username, password, userId
          })
        }
      })
    }))
  }
  updateVCS (id, type, description, username, password, userId) {
    return this.init().then(() => new Promise((resolve, reject) => {
      this.db.run(`UPDATE vcs SET type = ?, description = ?, username = ?, password = ?, user_id = ? WHERE id = ?`, [
        type, description, username, password, userId, id
      ], function (error) {
        if (error) {
          reject(error)
        } else {
          resolve({ changes: this.changes })
        }
      })
    }))
  }
  removeVCS (id) {
    return this.init().then(() => new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM vcs WHERE id = ?`, [id], function (error) {
        if (error) {
          reject(error)
        } else {
          resolve({ changes: this.changes })
        }
      })
    }))
  }

  // Project
  findProjectListByUserId (userId) {
    return this.init().then(() => new Promise((resolve, reject) => {
      this.db.all(`SELECT a.*, b.* FROM user_project a JOIN project b ON a.project_id = b.id WHERE a.user_id = ?`, userId, (error, rows) => {
        if (error) reject(error)
        else resolve(rows)
      })
    }))
  }
}

module.exports = Sqlite3DAO
