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
  findProfile (session) {
    return HttpFetch.httpGet('/api/findProfile')
  }
  findProject (projectId, session) {
    return HttpFetch.httpGet('/api/findProject', { projectId })
  }
  saveProject (projectInfo, session) {
    return HttpFetch.httpPost('/api/saveProject', null, { projectInfo })
  }
  findProjects (session) {
    return HttpFetch.httpGet('/api/findProjects')
  }
  findBranch (branchId, session) {
    return HttpFetch.httpGet('/api/findBranch', { branchId })
  }
  saveBranch (branchInfo, session) {
    return HttpFetch.httpPost('/api/saveBranch', null, { branchInfo })
  }
  findBranches (session) {
    return HttpFetch.httpGet('/api/findBranches')
  }
  deleteProject (projectId, session) {
    return HttpFetch.httpPost('/api/deleteProject', null, { projectId })
  }
  findAdminProject (userId, session) {
    return HttpFetch.httpGet('/api/findAdminProject', { userId })
  }
  saveAdminProject (userId, projectIdList, session) {
    return HttpFetch.httpPost('/api/saveAdminProject', null, { userId, projectIdList })
  }
  findProfileVCS (vcsId, session) {
    return HttpFetch.httpGet('/api/findProfileVCS', { vcsId })
  }
  saveProfileVCS (vcsInfo, session) {
    return HttpFetch.httpPost('/api/saveProfileVCS', null, { vcsInfo })
  }
  deleteProfileVCS (vcsId, session) {
    return HttpFetch.httpPost('/api/deleteProfileVCS', null, { vcsId })
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
