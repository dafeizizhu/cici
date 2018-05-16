const HuyaUDB = require('../utils/huya-udb')
const daoFactory = require('../dao/factory')

module.exports = opts => {
  return async (ctx, next) => {
    if (ctx.session.user) {
      await next()
    } else {
      var ret = await HuyaUDB.isLogin({
        'COOKIE[udb_l]': ctx.cookies.get('udb_l'),
        'COOKIE[udb_n]': ctx.cookies.get('udb_n'),
        'COOKIE[udb_oar]': ctx.cookies.get('udb_oar'),
        'COOKIE[yyuid]': ctx.cookies.get('yyuid'),
        'COOKIE[username]': ctx.cookies.get('username'),
        'COOKIE[password]': ctx.cookies.get('password'),
        'COOKIE[osinfo]': ctx.cookies.get('osinfo'),
        'COOKIE[oauthCookie]': ctx.cookies.get('oauthCookie'),
        'HTTP_USER_AGENT': ctx.header['user-agent'],
        'HTTP_HOST': 'v-fees-admin.huya.com'
      })

      if (ret && ret.yyuid) {
        ctx.session.user = ret

        let user = await daoFactory.getInstance().findUserByYYuid(ret.yyuid)
        if (user) {
          ctx.session.user = user
        } else {
          ctx.session.user = await daoFactory.getInstance().createUser(ret.yyuid, ret.username, '')
        }
        await next()
      } else {
        console.log(`ret ${JSON.stringify(ret)} is not valid`)
        ctx.redirect('/sign-in')
      }
    }
  }
}
