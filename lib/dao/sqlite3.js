const path = require('path')
const sqlite3 = require('sqlite3')
const { EventEmitter } = require('events')

const deferred = require('../utils/deferred')

let sharedInstance = null

const DB_FILE_NAME = path.join(__dirname, '../../db/cici.sqlite3')

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
    this.db.run(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        yyuid INTEGER NOT NULL,
        name TEXT NOT NULL,
        description TEXT DEFAULT ''
      )
    `, error => {
      if (!error) {
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
}

module.exports = Sqlite3DAO
