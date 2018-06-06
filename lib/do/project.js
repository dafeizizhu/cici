/* eslint camelcase: "off" */

class Project {
  static from (obj) {
    obj = obj || {}
    return new Project({
      id: obj.id,
      name: obj.name,
      description: obj.description,
      domain: obj.domain,
      owner_id: obj.ownerInfo.id
    })
  }
  constructor ({ id, name, description, domain, owner_id }) {
    this.id = id
    this.name = name
    this.description = description
    this.domain = domain
    this.owner_id = owner_id
  }
}

module.exports = Project
