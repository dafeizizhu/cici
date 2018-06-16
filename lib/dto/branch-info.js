/* eslint camelcase: "off" */

const { UserDAO, ProjectDAO } = require('../dao')

const UserInfo = require('../dto/user-info')
const ProjectInfo = require('../dto/project-info')

const VCSType = require('../enum/vcs-type')

const ownerInfoFrom = obj => {
  if (obj.hasOwnProperty('ownerInfo')) {
    return Promise.resolve(obj.branchInfo)
  } else if (obj.hasOwnProperty('owner_id')) {
    return UserDAO.getSharedInstance().findUserById(obj.owner_id)
      .then(user => UserInfo.from(user))
  } else {
    return UserInfo.from()
  }
}

const projectInfoFrom = obj => {
  if (obj.hasOwnProperty('projectInfo')) {
    return Promise.resolve(obj.projectInfo)
  } else if (obj.hasOwnProperty('project_id')) {
    return ProjectDAO.getSharedInstance().findProjectById(obj.project_id)
      .then(project => ProjectInfo.from(project))
  } else {
    return ProjectInfo.from()
  }
}

class BranchInfo {
  static from (obj) {
    obj = obj || {}
    let ret = {}
    return ownerInfoFrom(obj)
      .then(ownerInfo => {
        ret.ownerInfo = ownerInfo
        return projectInfoFrom(obj)
      })
      .then(projectInfo => {
        ret.projectInfo = projectInfo
        return new BranchInfo({
          id: obj.id,
          projectInfo: ret.projectInfo,
          ownerInfo: ret.ownerInfo,
          name: obj.name,
          description: obj.description,
          vcsType: VCSType.fromValue(obj.vcs_type) || VCSType.VCS_SVN,
          vcsUri: obj.vcs_uri,
          prevFetchTime: new Date(obj.prev_fetch_time || 0)
        })
      })
  }
  constructor ({ id, projectInfo, ownerInfo, name, description, vcsType, vcsUri, prevFetchTime }) {
    this.id = id
    this.projectInfo = projectInfo
    this.ownerInfo = ownerInfo
    this.name = name
    this.description = description
    this.vcsType = vcsType
    this.vcsUri = vcsUri
    this.prevFetchTime = prevFetchTime
  }
}

module.exports = BranchInfo
