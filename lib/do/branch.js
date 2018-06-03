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
      vcs_uri: obj.vcsUri
    })
  }
  constructor ({ id, project_id, owner_id, name, description, vcs_type, vcs_uri }) {
    this.id = id
    this.project_id = project_id
    this.owner_id = owner_id
    this.name = name
    this.description = description
    this.vcs_type = vcs_type
    this.vcs_uri = vcs_uri
  }
}

module.exports = Branch
