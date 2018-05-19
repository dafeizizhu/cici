/* eslint camelcase: "off" */

class Branch {
  static from (obj) {
    return new Branch(obj || {})
  }
  constructor ({ id, projectId, name, description, vcsType, vcsUri }) {
    this.id = id
    this.project_id = projectId
    this.name = name
    this.description = description
    this.vcs_type = vcsType.value
    this.vcs_uri = vcsUri
  }
}

module.exports = Branch
