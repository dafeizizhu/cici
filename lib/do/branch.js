/* eslint camelcase: "off" */

class Branch {
  static from (obj) {
    obj = obj || {}
    return new Branch({
      id: obj.id,
      project_id: obj.projectInfo.id,
      owner_id: obj.ownerInfo.id,
      name: obj.name,
      description: obj.description,
      vcs_type: obj.vcsType.value,
      vcs_uri: obj.vcsUri,
      prev_fetch_time: obj.prevFetchTime instanceof Date ? obj.prevFetchTime.valueOf() : 0
    })
  }
  constructor ({ id, project_id, owner_id, name, description, vcs_type, vcs_uri, prev_fetch_time }) {
    this.id = id
    this.project_id = project_id
    this.owner_id = owner_id
    this.name = name
    this.description = description
    this.vcs_type = vcs_type
    this.vcs_uri = vcs_uri
    this.prev_fetch_time = prev_fetch_time
  }
}

module.exports = Branch
