const _ = require('koa-route')
const compose = require('koa-compose')
const ServerApi = require('../api')

module.exports = compose([
  _.get('/api/findProfile', async ctx => {
    ctx.body = await ServerApi.getSharedInstance().findProfile(ctx.query.userId)
  })
])
