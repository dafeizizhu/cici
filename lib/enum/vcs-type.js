class VCSType {
  static get VCS_SVN () { return VCS_SVN }
  static get VCS_GIT () { return VCS_GIT }
  static fromValue (value) {
    switch (value) {
      case 1: return VCS_SVN
      case 2: return VCS_GIT
      default: return VCS_SVN
    }
  }
  static all () {
    return [
      VCS_SVN,
      VCS_GIT
    ]
  }
  constructor (value, name) {
    this.value = value
    this.name = name
  }
}

const VCS_SVN = new VCSType(1, 'svn')
const VCS_GIT = new VCSType(2, 'git')

module.exports = VCSType
