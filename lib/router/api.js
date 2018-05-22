const _ = require('koa-route')
const compose = require('koa-compose')
const ServerApi = require('../api')

module.exports = compose([
  _.get('/api/findProfile', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().findProfile(ctx.session.user.id)
  }),
  _.get('/api/findProject', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().findProject(ctx.query.projectId, ctx.session.user.id)
  }),
  _.post('/api/saveProject', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().saveProject(ctx.request.body.projectInfo, ctx.session.user.id)
  }),
  _.get('/api/findProjects', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().findProjects(ctx.session.user.id)
  }),
  _.get('/api/findBranch', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().findBranch(ctx.query.branchId, ctx.session.user.id)
  }),
  _.post('/api/saveBranch', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().saveBranch(ctx.request.body.branchInfo, ctx.session.user.id)
  }),
  _.get('/api/findBranches', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().findBranches(ctx.session.user.id)
  }),
  _.post('/api/deleteProject', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().deleteProject(ctx.request.body.projectId, ctx.session.user.id)
  })
])
