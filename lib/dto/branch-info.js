/* eslint camelcase: "off" */

const { ProjectDAO } = require('../dao')

const ProjectInfo = require('../dto/project-info')

const VCSType = require('../enum/vcs-type')

class BranchInfo {
  static from (obj) {
    obj = obj || {}
    if (obj.hasOwnProperty('projectInfo')) {
      console.info('BranchInfo.from: unsafe projectInfo')
      return Promise.resolve(new BranchInfo(obj))
    } else {
      return ProjectDAO.getSharedInstance().findProjectById(obj.project_id)
        .then(project => ProjectInfo.from(project))
        .then(projectInfo => new BranchInfo(Object.assign({}, obj, { projectInfo })))
    }
  }
  constructor ({ id, project_id, name, description, vcs_type, vcs_uri, projectInfo }) {
    this.id = id || ''
    this.name = name || ''
    this.description = description || ''
    this.vcsType = VCSType.fromValue(vcs_type) || VCSType.VCS_SVN
    this.vcsUri = vcs_uri || ''

    this.projectInfo = projectInfo
  }
}

module.exports = BranchInfo
