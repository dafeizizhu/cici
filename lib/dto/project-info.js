class ProjectInfo {
  static from (obj) {
    return Promise.resolve(new ProjectInfo(obj || {}))
  }
  constructor () {
    throw new Error('not implement')
  }
  toProject () {
    throw new Error('not implement')
  }
}

module.exports = ProjectInfo
