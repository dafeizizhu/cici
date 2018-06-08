const { DeployDAO, ProjectDAO, BranchDAO } = require('../dao')

const Deploy = require('../do/deploy')

const DeployInfo = require('../dto/deploy-info')
const ProjectInfo = require('../dto/project-info')
const BranchInfo = require('../dto/branch-info')

let sharedInstance = null

class DeployService {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new DeployService()
    }
    return sharedInstance
  }
  findDeploy (deployId, projectId, session) {
    let ret = {}
    return DeployDAO.getSharedInstance().findDeployById(deployId)
      .then(deploy => {
        if (deploy && deploy.id) {
          return DeployInfo.from(deploy)
        } else {
          return ProjectDAO.getSharedInstance().findProjectById(projectId)
            .then(project => {
              if (project && project.id) {
                return ProjectInfo.from(project)
              } else {
                return Promise.reject(new Error('projectId is not valid'))
              }
            })
            .then(projectInfo => DeployInfo.from(Object.assign(deploy || {}, {
              projectInfo,
              ownerInfo: session.user
            })))
        }
      })
      .then(deployInfo => {
        ret.deployInfo = deployInfo
        return BranchDAO.getSharedInstance().findBranchListByProjectId(projectId)
      })
      .then(branchList => Promise.all(branchList.map(branch => BranchInfo.from(branch))))
      .then(branchInfoList => {
        ret.branchInfoList = branchInfoList
        return ret
      })
  }
  saveDeploy (deployInfo, session) {
    if (deployInfo.id) {
      return DeployDAO.getSharedInstance().updateDeploy(Deploy.from(deployInfo))
    } else {
      return DeployDAO.getSharedInstance().createDeploy(Deploy.from(deployInfo))
    }
  }
}

module.exports = DeployService
