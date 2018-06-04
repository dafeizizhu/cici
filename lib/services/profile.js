const { UserDAO, VCSDAO, UserBranchDAO, BranchDAO } = require('../dao')

const VCS = require('../do/vcs')
const UserBranch = require('../do/user-branch')

const UserInfo = require('../dto/user-info')
const VCSInfo = require('../dto/vcs-info')
const BranchInfo = require('../dto/branch-info')
const UserBranchInfo = require('../dto/user-branch-info')

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
  findProfileBranch (branchId, session) {
    let ret = {}
    if (!branchId) {
      return Promise.reject(new Error('branchId is required'))
    } else {
      return BranchDAO.getSharedInstance().findBranchByIdAndUserId(branchId, session.user.id)
        .then(branch => {
          if (!branch) {
            return Promise.reject(new Error('no permission for branchId ' + branchId))
          } else {
            return BranchInfo.from(branch)
          }
        })
        .then(branchInfo => {
          ret.branchInfo = branchInfo
          return UserBranchDAO.getSharedInstance().findUserBranchByUserIdAndBranchId(session.user.id, branchId)
        }).then(userBranch => {
          userBranch = Object.assign({
            userInfo: session.user,
            branchInfo: ret.branchInfo
          }, userBranch)
          return UserBranchInfo.from(userBranch)
        })
        .then(userBranchInfo => {
          ret.userBranchInfo = userBranchInfo
          return VCSDAO.getSharedInstance().findVCSListByUserId(session.user.id)
        })
        .then(vcsList => {
          return Promise.all(vcsList.map(vcs => VCSInfo.from(Object.assign(vcs, { userInfo: session.user }))))
        })
        .then(vcsInfoList => {
          ret.vcsInfoList = vcsInfoList
          return ret
        })
    }
  }
  saveProfileBranch (userBranchInfo, session) {
    if (userBranchInfo.id) {
      return UserBranchDAO.getSharedInstance().updateUserBranch(UserBranch.from(userBranchInfo))
    } else {
      return UserBranchDAO.getSharedInstance().createUserBranch(UserBranch.from(userBranchInfo))
    }
  }
}

module.exports = ProfileService
