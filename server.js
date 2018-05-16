require('babel-register')({
  only: '/node_modules/koa-*/*'
})

const Koa = require('koa')
const path = require('path')
const logger = require('koa-logger')
const session = require('koa-session')
const fs = require('fs')
const bodyParser = require('koa-bodyparser')
const mount = require('koa-mount')
const serve = require('koa-static')

const vueRender = require('./lib/vue-render')

const SESSION_CONFIG = {
  key: 'cici.fed.huya.com'
}
const PORT = 12345

const app = new Koa()

app.keys = ['vue-ssr-skeleton']

var render = vueRender(app, fs.readFileSync(path.resolve(__dirname, './src/index.template.html'), 'utf-8'))

require('koa-qs')(app)

if (process.env.NODE_ENV === 'dev') app.use(logger())

const signin = require('./lib/router/sign-in')
const auth = require('./lib/middlewares/auth')
const signout = require('./lib/router/sign-out')
const api = require('./lib/router/api')

app.use(session(SESSION_CONFIG, app))

if (process.env.NODE_ENV !== 'dev') {
  app.use(mount('/dist', serve(path.join(__dirname, 'dist'))))
}

app.use(signin)
app.use(auth())
app.use(signout)
app.use(bodyParser())
app.use(api)
app.use(async ctx => {
  ctx.type = 'html'
  try {
    ctx.body = await render({ url: ctx.url, title: 'Cici系统', session: ctx.session })
  } catch (error) {
    ctx.throw(error.code, error.message, error)
  }
})

app.listen(PORT)

process.on('SIGINT', () => {
  process.exit(0)
})
process.on('unhandledRejection', (reason, p) => {
  console.warn('Unhandled Rejection at:', p, 'reason:', reason)
  process.exit(1)
})
process.on('uncaughtException', err => {
  console.warn('uncaughtException', err)
  process.exit(1)
})
