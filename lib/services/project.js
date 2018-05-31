const { ProjectDAO, UserProjectDAO, BranchDAO, UserBranchDAO } = require('../dao')

const Project = require('../do/project')

const ProjectInfo = require('../dto/project-info')
const BranchInfo = require('../dto/branch-info')

let sharedInstance = null

class ProjectService {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new ProjectService()
    }
    return sharedInstance
  }
  findProject (projectId, userId) {
    if (!projectId) {
      return ProjectInfo.from({}).then(projectInfo => ({ projectInfo, branchInfoList: [] }))
    } else {
      let ret = {}
      return ProjectDAO.getSharedInstance().findProjectById(projectId)
        .then(project => ProjectInfo.from(project))
        .then(projectInfo => {
          ret.projectInfo = projectInfo
          return BranchDAO.getSharedInstance().findBranchListByProjectId(projectId)
        })
        .then(branchList => Promise.all(branchList.map(branch => {
          branch = Object.assign({}, branch, { projectInfo: ret.projectInfo })
          return BranchInfo.from(branch)
        })))
        .then(branchInfoList => {
          ret.branchInfoList = branchInfoList
          return ret
        })
    }
  }
  saveProject (projectInfo) {
    if (projectInfo.id) {
      return ProjectDAO.getSharedInstance().updateProject(Project.from(projectInfo))
    } else {
      return ProjectDAO.getSharedInstance().createProject(Project.from(projectInfo))
    }
  }
  findProjects (userId) {
    return ProjectDAO.getSharedInstance().findProjectListByUserId(userId)
      .then(projectList => Promise.all(projectList.map(project => ProjectInfo.from(project))))
      .then(projectInfoList => ({ projectInfoList }))
  }
  deleteProject (projectId, userId) {
    let ret = {}
    return ProjectDAO.getSharedInstance().findProjectById(projectId)
      .then(project => {
        ret.project = project
        return UserProjectDAO.getSharedInstance().findUserProjectListByProjectId(projectId)
      })
      .then(userProjectList => {
        ret.userProjectList = userProjectList
        return BranchDAO.getSharedInstance().findBranchListByProjectId(projectId)
      })
      .then(branchList => {
        ret.branchList = branchList
        return UserBranchDAO.getSharedInstance().findUserBranchListByProjectId(branchList.map(branch => branch.id))
      })
      .then(userBranchList => {
        ret.userBranchList = userBranchList
        return ret
      })
  }
}

module.exports = ProjectService
