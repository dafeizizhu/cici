const _ = require('koa-route')
const compose = require('koa-compose')

module.exports = compose([
  _.get('/sign-out', async ctx => {
    ctx.session = null
    ctx.type = 'html'
    ctx.body = 'already sign out, please close your browser to clear session cookie'.toUpperCase()
  })
])
