const { ProjectDAO } = require('../dao')

const Project = require('../do/project')

const ProjectInfo = require('../dto/project-info')

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
      return ProjectInfo.from({}).then(projectInfo => ({ projectInfo }))
    } else {
      return ProjectDAO.getSharedInstance().findProjectById(projectId)
        .then(project => ProjectInfo.from(project))
        .then(projectInfo => ({ projectInfo }))
    }
  }
  saveProject (projectInfo) {
    if (projectInfo.id) {
      // update
      throw new Error('not implemented')
    } else {
      // create
      return ProjectDAO.getSharedInstance().createProject(Project.from(projectInfo))
    }
  }
  findProjects (userId) {
    return ProjectDAO.getSharedInstance().findProjectListByUserId(userId)
      .then(projectList => Promise.all(projectList.map(project => ProjectInfo.from(project))))
      .then(projectInfoList => ({ projectInfoList }))
  }
}

module.exports = ProjectService