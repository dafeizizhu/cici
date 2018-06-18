const VCSType = require('../enum/vcs-type')

const map = {}
map[VCSType.VCS_SVN.value] = require('./svn')

exports.getInstance = vcsType => {
  console.info(vcsType)
  console.info(map)
  return map[vcsType].getSharedInstance()
}
