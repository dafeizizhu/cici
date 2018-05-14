const HuyaUDB = require('../utils/huya-udb')

module.exports = opts => {
  return async (ctx, next) => {
    if (ctx.session.user) {
      await next()
    } else {
      console.log('need auth')
      console.log('COOKIE[udb_l]', ctx.cookies.get('udb_l'))
      console.log('COOKIE[udb_n]', ctx.cookies.get('udb_n'))
      console.log('COOKIE[udb_oar]', ctx.cookies.get('udb_oar'))
      console.log('COOKIE[yyuid]', ctx.cookies.get('yyuid'))
      console.log('COOKIE[username]', ctx.cookies.get('username'))
      console.log('COOKIE[password]', ctx.cookies.get('password'))
      console.log('COOKIE[osinfo]', ctx.cookies.get('osinfo'))
      console.log('COOKIE[oauthCookie]', ctx.cookies.get('oauthCookie'))
      console.log('HTTP_USER_AGENT', ctx.header['user-agent'])
      console.log('HTTP_HOST', 'v-fees-admin.huya.com')

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
        await next()
      } else {
        console.log(`ret ${JSON.stringify(ret)} is not valid`)
        ctx.redirect('/sign-in')
      }
    }
  }
}
