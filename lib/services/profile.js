const { UserDAO, VCSDAO, ProjectDAO } = require('../dao')

const UserInfo = require('../dto/user-info')
const VCSInfo = require('../dto/vcs-info')
const ProjectInfo = require('../dto/project-info')

let sharedInstance = null

class ProfileService {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new ProfileService()
    }
    return sharedInstance
  }
  findProfile (userId) {
    let profileInfo = { id: userId }
    return UserDAO.getSharedInstance().findUserById(userId).then(user => {
      return UserInfo.from(user)
    }).then(userInfo => {
      profileInfo.userInfo = userInfo
      return VCSDAO.getSharedInstance().findVCSListByUserId(userId)
    }).then(vcsList => {
      return Promise.all(vcsList.map(vcs => VCSInfo.from(vcs)))
    }).then(vcsInfoList => {
      profileInfo.vcsInfoList = vcsInfoList
      return ProjectDAO.getSharedInstance().findProjectListByUserId(userId)
    }).then(projectList => {
      return Promise.all(projectList.map(project => ProjectInfo.from(project)))
    }).then(projectInfoList => {
      profileInfo.projectInfoList = projectInfoList
      return profileInfo
    })
  }
}

module.exports = ProfileService
