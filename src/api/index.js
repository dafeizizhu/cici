/* global fetch */

const querystring = require('querystring')

// User
exports.findVCSListByUserId = userId => fetch('/api/findVCSListByUserId?' + querystring.stringify({ userId }), {
  credentials: 'same-origin'
}).then(response => response.json())

// VCS
exports.createVCS = (type, description, username, password, userId) => fetch('api/createVCS', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type, description, username, password, userId
  })
}).then(response => response.json())

exports.updateVCS = (id, type, description, username, password, userId) => fetch('api/updateVCS', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id, type, description, username, password, userId
  })
}).then(response => response.json())

exports.removeVCS = id => fetch('api/removeVCS', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ id })
}).then(response => response.json())
