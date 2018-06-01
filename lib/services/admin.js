const { UserDAO, ProjectDAO, UserProjectDAO } = require('../dao')

const UserInfo = require('../dto/user-info')
const ProjectInfo = require('../dto/project-info')
const UserProjectInfo = require('../dto/user-project-info')

let sharedInstance = null

class AdminService {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new AdminService()
    }
    return sharedInstance
  }
  findAdmin (userId) {
    let ret = {}
    return UserDAO.getSharedInstance().findUserList()
      .then(userList => Promise.all(userList.map(user => UserInfo.from(user))))
      .then(userInfoList => {
        ret.userInfoList = userInfoList
        return ProjectDAO.getSharedInstance().findProjectList()
      })
      .then(projectList => Promise.all(projectList.map(project => ProjectInfo.from(project))))
      .then(projectInfoList => {
        ret.projectInfoList = projectInfoList
        return UserProjectDAO.getSharedInstance().findUserProjectByUserId(userId)
      })
      .then(userProjectList => Promise.all(userProjectList.map(userProject => UserProjectInfo.from(userProject))))
      .then(userProjectInfoList => {
        ret.userProjectInfoList = userProjectInfoList
        return ret
      })
  }
  saveAdminProject (userId, projectIdList) {
    let ret = {}
    return UserProjectDAO.getSharedInstance().findUserProjectByUserId(userId)
      .then(userProjectList => {
        ret.userProjectList = userProjectList
        return Promise.all(projectIdList.map(projectId => {
          if (userProjectList.map(userProject => userProject.project_id).indexOf(projectId) < 0) {
            return UserProjectDAO.getSharedInstance().createUserProject({ user_id: userId, project_id: projectId })
          } else {
            return Promise.resolve()
          }
        }))
      })
      .then(_ => Promise.all(ret.userProjectList.map(userProject => {
        if (projectIdList.indexOf(userProject.project_id) < 0) {
          return UserProjectDAO.getSharedInstance().deleteUserProjectById(userProject.id)
        } else {
          return Promise.resolve()
        }
      })))
  }
}

module.exports = AdminService
