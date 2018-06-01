/* eslint camelcase: "off" */

const { UserDAO, ProjectDAO } = require('../dao')

const UserInfo = require('../dto/user-info')
const ProjectInfo = require('../dto/project-info')

class UserProjectInfo {
  static from (obj) {
    obj = obj || {}
    let ret = { id: obj.id }
    return UserDAO.getSharedInstance().findUserById(obj.user_id)
      .then(user => UserInfo.from(user))
      .then(userInfo => {
        ret.userInfo = userInfo
        return ProjectDAO.getSharedInstance().findProjectById(obj.project_id)
      })
      .then(project => ProjectInfo.from(project))
      .then(projectInfo => {
        ret.projectInfo = projectInfo
        return ret
      })
  }
  constructor ({ id, userInfo, projectInfo }) {
    this.id = id
    this.userInfo = userInfo
    this.projectInfo = projectInfo
  }
}

module.exports = UserProjectInfo
