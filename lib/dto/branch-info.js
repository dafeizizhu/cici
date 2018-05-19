/* eslint camelcase: "off" */

const VCSType = require('../enum/vcs-type')

class BranchInfo {
  static from (obj) {
    return Promise.resolve(new BranchInfo(obj || {}))
  }
  constructor ({ id, project_id, name, description, vcs_type, vcs_uri, projectInfo }) {
    this.id = id || ''
    this.name = name || '123123'
    this.description = description || '312313'
    this.vcsType = VCSType.fromValue(vcs_type) || VCSType.VCS_SVN
    this.vcsUri = vcs_uri || '321313'

    this.projectInfo = projectInfo
  }
}

module.exports = BranchInfo
