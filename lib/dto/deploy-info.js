/* eslint camelcase: "off" */

const { UserDAO, ProjectDAO, BranchDAO } = require('../dao')

const UserInfo = require('./user-info')
const ProjectInfo = require('./project-info')
const BranchInfo = require('./branch-info')

const ownerInfoFrom = obj => {
  if (obj.hasOwnProperty('ownerInfo')) {
    return Promise.resolve(obj.ownerInfo)
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

const mainBranchInfoFrom = (obj, projectInfo) => {
  if (obj.hasOwnProperty('mainBranchInfo')) {
    return Promise.resolve(obj.mainBranchInfo)
  } else if (obj.hasOwnProperty('main_branch_id')) {
    return BranchDAO.getSharedInstance().findBranchById(obj.main_branch_id)
      .then(branch => BranchInfo.from(Object.assign(branch, { projectInfo })))
  } else {
    return BranchInfo.from()
  }
}

class DeployInfo {
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
        return mainBranchInfoFrom(obj, projectInfo)
      })
      .then(branchInfo => {
        ret.mainBranchInfo = branchInfo
        return new DeployInfo({
          id: obj.id,
          projectInfo: ret.projectInfo,
          mainBranchInfo: ret.mainBranchInfo,
          ownerInfo: ret.ownerInfo,
          name: obj.name,
          description: obj.description,
          dist: obj.dist
        })
      })
  }
  constructor ({ id, projectInfo, mainBranchInfo, ownerInfo, name, description, dist }) {
    this.id = id
    this.projectInfo = projectInfo
    this.mainBranchInfo = mainBranchInfo
    this.ownerInfo = ownerInfo
    this.name = name
    this.description = description
    this.dist = dist
  }
}

module.exports = DeployInfo
