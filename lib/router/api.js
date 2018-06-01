const _ = require('koa-route')
const compose = require('koa-compose')
const ServerApi = require('../api')

module.exports = compose([
  _.get('/api/findProfile', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().findProfile(ctx.session)
  }),
  _.get('/api/findProject', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().findProject(ctx.query.projectId, ctx.session)
  }),
  _.post('/api/saveProject', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().saveProject(ctx.request.body.projectInfo, ctx.session)
  }),
  _.get('/api/findProjects', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().findProjects(ctx.session)
  }),
  _.get('/api/findBranch', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().findBranch(ctx.query.branchId, ctx.session)
  }),
  _.post('/api/saveBranch', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().saveBranch(ctx.request.body.branchInfo, ctx.session)
  }),
  _.get('/api/findBranches', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().findBranches(ctx.session)
  }),
  _.post('/api/deleteProject', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().deleteProject(ctx.request.body.projectId, ctx.session)
  }),
  _.get('/api/findAdmin', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().findAdmin(ctx.query.userId, ctx.session)
  }),
  _.post('/api/saveAdminProject', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().saveAdminProject(ctx.request.body.userId, ctx.request.body.projectIdList, ctx.session)
  })
])
