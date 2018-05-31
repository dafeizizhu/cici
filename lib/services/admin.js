const { ProjectDAO, UserProjectDAO } = require('../dao')

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
    return ProjectDAO.getSharedInstance().findProjectList()
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
}

module.exports = AdminService
