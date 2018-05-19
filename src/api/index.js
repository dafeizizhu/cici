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
    return HttpFetch.httpGet('/api/findProfile')
  }
  findProject (projectId, userId) {
    return HttpFetch.httpGet('/api/findProject', { projectId })
  }
  saveProject (projectInfo, userId) {
    return HttpFetch.httpPost('/api/saveProject', null, { projectInfo })
  }
  findProjects (userId) {
    return HttpFetch.httpGet('/api/findProjects')
  }
  findBranch (branchId, userId) {
    return HttpFetch.httpGet('/api/findBranch', { branchId })
  }
  saveBranch (branchInfo, userId) {
    return HttpFetch.httpPost('/api/saveBranch', null, { branchInfo })
  }
  findBranches (userId) {
    return HttpFetch.httpGet('/api/findBranches')
  }
}

class HttpFetch {
  static prepareUrl (url, qs) {
    if (!qs) return url
    else return url + '?' + querystring.stringify(qs)
  }
  static httpGet (url, qs) {
    return fetch(this.prepareUrl(url, qs), {
      credentials: 'same-origin'
    }).then(response => response.json())
  }
  static httpPost (url, qs, body) {
    return fetch(this.prepareUrl(url, qs), {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => response.json())
  }
}

module.exports = ClientApi
