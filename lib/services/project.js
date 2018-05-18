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
  findProject (projectId) {
    if (!projectId) {
      return ProjectInfo.from({}).then(projectInfo => ({ projectInfo }))
    } else {
      // let model = {}
      return Promise.reject(new Error('not implement'))
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
}

module.exports = ProjectService
