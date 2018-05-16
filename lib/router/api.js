const _ = require('koa-route')
const compose = require('koa-compose')
const api = require('../api')

module.exports = compose([
  _.get('/api/findVCSListByUserId', async ctx => {
    ctx.body = await api.findVCSListByUserId(ctx.query.userId)
  }),
  _.post('/api/createVCS', async ctx => {
    let { type, description, username, password, userId } = ctx.request.body
    ctx.body = await api.createVCS(type, description, username, password, userId)
  }),
  _.post('/api/updateVCS', async ctx => {
    let { id, type, description, username, password, userId } = ctx.request.body
    ctx.body = await api.updateVCS(id, type, description, username, password, userId)
  }),
  _.post('/api/removeVCS', async ctx => {
    let { id } = ctx.request.body
    ctx.body = await api.removeVCS(id)
  })
])
