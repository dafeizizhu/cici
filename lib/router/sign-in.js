const _ = require('koa-route')
const compose = require('koa-compose')

var template = `
<!doctype html>
<html>
  <head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
    <title>Huya Video FEES Manager</title>
    <script type='text/javascript' src='http://assets.dwstatic.com/b=common/js&f=jquery-1.10.2.min.js,jquery-migrate-1.2.1.min.js,dwudbproxy.js&20141030'></script>
    <script type='text/javascript'>$(window).on('load', function(){dwUDBProxy.login('/manager?_${new Date().valueOf()}');});</script>
  </head>
  <body>
  </body>
</html>
`

module.exports = compose([
  _.get('/sign-in', async ctx => {
    ctx.type = 'html'
    ctx.body = template
  })
])
