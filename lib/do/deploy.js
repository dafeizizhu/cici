/* eslint camelcase: "off" */

const md5 = require('md5')

class Deploy {
  static from (obj) {
    obj = obj || {}
    return new Deploy({
      id: obj.id,
      project_id: obj.projectInfo.id,
      main_branch_id: obj.mainBranchInfo.id,
      owner_id: obj.ownerInfo.id,
      name: obj.name,
      description: obj.description,
      dist: obj.dist || md5(obj.name + new Date().valueOf())
    })
  }
  constructor ({ id, project_id, main_branch_id, owner_id, name, description, dist }) {
    this.id = id
    this.main_branch_id = main_branch_id
    this.project_id = project_id
    this.owner_id = owner_id
    this.name = name
    this.description = description
    this.dist = dist
  }
}

module.exports = Deploy
