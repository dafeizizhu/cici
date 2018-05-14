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
        this.ee.emit('initError')
      }
    })
  }
  findUserByYYuid (yyuid, d) {
    console.info('findUserByYYuid', yyuid)
    d = d || deferred()

    if (this.inited) {
      this.db.get(`SELECT * FROM user WHERE yyuid = ?`, yyuid, (error, row) => {
        if (error) d.reject(error)
        else d.resolve(row)
      })
    } else {
      this.ee.once('inited', () => this.findUserByYYuid(yyuid, d))
      this.ee.once('initError', () => d.reject(new Error('not inited')))
    }

    return d.promise
  }
}

module.exports = Sqlite3DAO
