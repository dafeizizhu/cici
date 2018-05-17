/* global fetch */

const querystring = require('querystring')

let sharedInstance = null

class ClientApi {
  static getSharedInstance () {
    if (!sharedInstance) {
      sharedInstance = new ClientApi()
    }
    return sharedInstance
  }
  findProfile (userId) {
    return fetch('/api/findProfile?' + querystring.stringify({ userId }), {
      credentials: 'same-origin'
    }).then(response => response.json())
  }
}

module.exports = ClientApi
