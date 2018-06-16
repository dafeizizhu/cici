const path = require('path')
const sqlite3 = require('sqlite3')
const { EventEmitter } = require('events')
const async = require('async')

let sharedInstance = null

const DB_FILE_NAME = path.join(process.env.SRC_HOME || path.join(__dirname, '../../..'), 'db/cici.sqlite3')

class Sqlite3Driver {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new Sqlite3Driver()
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
        project_id INTEGER NOT NULL
      );
    `, `
      CREATE TABLE IF NOT EXISTS project (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        owner_id INTEGER NOT NULL
      );
    `, `
      CREATE TABLE IF NOT EXISTS branch (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        vcs_type INTEGER NOT NULL,
        vcs_uri TEXT,
        project_id INTEGER NOT NULL,
        owner_id INTEGER NOT NULL
      );
    `, `
      CREATE TABLE IF NOT EXISTS user_branch (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        branch_id INTEGER NOT NULL,
        vcs_id INTEGER
      );
    `, `
      CREATE TABLE IF NOT EXISTS deploy (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        main_branch_id INTEGER NOT NULL,
        owner_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        description NOT NULL,
        dist TEXT NOT NULL
      );
    `, `
      CREATE TABLE IF NOT EXISTS cici_commit (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        branch_id INTEGER NOT NULL,
        key TEXT NOT NULL,
        author TEXT NOT NULL,
        message TEXT DEFAULT ''
      );
    `], (sql, cb) => {
      this.db.run(sql, cb)
    }, error => {
      if (!error) {
        console.info('createTable success')
        this.alterTables()
      } else {
        console.warn('createTable error', error)
        this.isError = true
        this.ee.emit('initError')
      }
    })
  }
  alterTables () {
    async.each([`
      ALTER TABLE project
      ADD COLUMN domain TEXT DEFAULT ''
    `, `
      ALTER TABLE branch
      ADD COLUMN prev_fetch_time INTEGER DEFAULT 0
    `], (sql, cb) => {
      this.db.run(sql, _ => cb())
    }, _ => {
      this.inited = true
      this.ee.emit('inited')
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
  run (sql, params) {
    return this.init().then(() => new Promise((resolve, reject) => {
      this.db.run(sql, params, function (error) {
        if (error) {
          reject(new Error(JSON.stringify({
            message: error.message,
            sql,
            params
          })))
        } else resolve(this)
      })
    }))
  }
  get (sql, params) {
    return this.init().then(() => new Promise((resolve, reject) => {
      this.db.get(sql, params, function (error, row) {
        if (error) {
          reject(new Error(JSON.stringify({
            message: error.message,
            sql,
            params
          })))
        } else resolve(row)
      })
    }))
  }
  all (sql, params) {
    return this.init().then(() => new Promise((resolve, reject) => {
      this.db.all(sql, params, function (error, rows) {
        if (error) {
          reject(new Error(JSON.stringify({
            message: error.message,
            sql,
            params
          })))
        } else resolve(rows)
      })
    }))
  }
}

module.exports = Sqlite3Driver
