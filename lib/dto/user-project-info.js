/* eslint camelcase: "off" */

const { UserDAO, ProjectDAO } = require('../dao')

const UserInfo = require('../dto/user-info')
const ProjectInfo = require('../dto/project-info')

const userInfoFrom = obj => {
  if (obj.hasOwnProperty('userInfo')) {
    return Promise.resolve(obj.userInfo)
  } else if (obj.hasOwnProperty('user_id')) {
    return UserDAO.getSharedInstance().findUserById(obj.user_id)
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

class UserProjectInfo {
  static from (obj) {
    obj = obj || {}
    let ret = { id: obj.id }
    return userInfoFrom(obj)
      .then(userInfo => {
        ret.userInfo = userInfo
        return projectInfoFrom(obj)
      })
      .then(projectInfo => {
        ret.projectInfo = projectInfo
        return new UserProjectInfo(ret)
      })
  }
  constructor ({ id, userInfo, projectInfo }) {
    this.id = id
    this.userInfo = userInfo
    this.projectInfo = projectInfo
  }
}

module.exports = UserProjectInfo
