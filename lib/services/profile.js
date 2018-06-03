const { UserDAO, VCSDAO, UserBranchDAO } = require('../dao')

const VCS = require('../do/vcs')

const UserInfo = require('../dto/user-info')
const VCSInfo = require('../dto/vcs-info')

const VCSType = require('../enum/vcs-type')

const ProjectService = require('./project')

let sharedInstance = null

class ProfileService {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new ProfileService()
    }
    return sharedInstance
  }
  findProfile (session) {
    let userId = session.user.id
    let model = { id: userId, vcsTypes: VCSType.all() }
    return UserDAO.getSharedInstance().findUserById(userId).then(user => {
      return UserInfo.from(user)
    }).then(userInfo => {
      model.userInfo = userInfo
      return VCSDAO.getSharedInstance().findVCSListByUserId(userId)
    }).then(vcsList => {
      return Promise.all(vcsList.map(vcs => VCSInfo.from(vcs)))
    }).then(vcsInfoList => {
      model.vcsInfoList = vcsInfoList
      return ProjectService.getSharedInstance().findProjects(session)
    }).then(({ projectInfoList }) => {
      model.projectInfoList = projectInfoList
      return model
    })
  }
  findProfileVCS (vcsId, session) {
    if (!vcsId) {
      return VCSInfo.from({ user_id: session.user.id })
        .then(vcsInfo => Promise.resolve({ vcsTypes: VCSType.all(), vcsInfo }))
    } else {
      return VCSDAO.getSharedInstance().findVCSById(vcsId)
        .then(vcs => VCSInfo.from(vcs))
        .then(vcsInfo => Promise.resolve({ vcsTypes: VCSType.all(), vcsInfo }))
    }
  }
  saveProfileVCS (vcsInfo, session) {
    if (vcsInfo.id) {
      return VCSDAO.getSharedInstance().updateVCS(VCS.from(vcsInfo))
    } else {
      return VCSDAO.getSharedInstance().createVCS(VCS.from(vcsInfo))
    }
  }
  deleteProfileVCS (vcsId, session) {
    return VCSDAO.getSharedInstance().deleteVCS(vcsId)
      .then(_ => UserBranchDAO.getSharedInstance().deleteUserBranchByVCSId(vcsId))
  }
}

module.exports = ProfileService
