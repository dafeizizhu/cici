const _ = require('koa-route')
const compose = require('koa-compose')
const ServerApi = require('../api')

module.exports = compose([
  _.get('/api/findProfile', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().findProfile(ctx.query.userId)
  }),
  _.get('/api/findProject', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().findProject(ctx.query.projectId)
  }),
  _.post('/api/saveProject', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().saveProject(ctx.request.body.projectInfo)
  })
])
