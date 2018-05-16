const daoFactory = require('../dao/factory')

const findVCSListByUserId = userId => {
  return daoFactory.getInstance().findVCSListByUserId(userId)
}

const findProjectListByUserId = userId => {
  return daoFactory.getInstance().findProjectListByUserId(userId)
}

const createVCS = (type, description, username, password, userId) => {
  return daoFactory.getInstance().createVCS(type, description, username, password, userId)
}

const updateVCS = (id, type, description, username, password, userId) => {
  return daoFactory.getInstance().updateVCS(id, type, description, username, password, userId)
}

const removeVCS = id => {
  return daoFactory.getInstance().removeVCS(id)
}

module.exports = {
  findVCSListByUserId,
  findProjectListByUserId,
  createVCS,
  updateVCS,
  removeVCS
}
