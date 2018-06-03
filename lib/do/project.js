/* eslint camelcase: "off" */

class Project {
  static from (obj) {
    obj = obj || {}
    return new Project({
      id: obj.id,
      name: obj.name,
      description: obj.description,
      owner_id: obj.ownerInfo.id
    })
  }
  constructor ({ id, name, description, owner_id }) {
    this.id = id
    this.name = name
    this.description = description
    this.owner_id = owner_id
  }
}

module.exports = Project
