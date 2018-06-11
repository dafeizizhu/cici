const { ProjectDAO, UserProjectDAO, BranchDAO, UserBranchDAO, DeployDAO } = require('../dao')

const Project = require('../do/project')

const ProjectInfo = require('../dto/project-info')
const BranchInfo = require('../dto/branch-info')
const DeployInfo = require('../dto/deploy-info')

let sharedInstance = null

class ProjectService {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new ProjectService()
    }
    return sharedInstance
  }
  findProject (projectId, session) {
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
          return DeployDAO.getSharedInstance().findDeployListByProjectId(projectId)
        })
        .then(deployList => Promise.all(deployList.map(deploy => {
          deploy = Object.assign({}, deploy, {
            projectInfo: ret.projectInfo,
            mainBranchInfo: ret.branchInfoList.filter(branchInfo => branchInfo.id === deploy.main_branch_id)[0]
          })
          return DeployInfo.from(deploy)
        })))
        .then(deployInfoList => {
          ret.deployInfoList = deployInfoList
          return ret
        })
    }
  }
  saveProject (projectInfo, session) {
    if (projectInfo.id) {
      return ProjectDAO.getSharedInstance().updateProject(Project.from(projectInfo))
    } else {
      return ProjectDAO.getSharedInstance().createProject(Project.from(projectInfo))
    }
  }
  findProjects (session) {
    let userId = session.user.id
    return ProjectDAO.getSharedInstance().findProjectListByUserId(userId)
      .then(projectList => Promise.all(projectList.map(project => ProjectInfo.from(project))))
      .then(projectInfoList => ({ projectInfoList }))
  }
  deleteProject (projectId, session) {
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
