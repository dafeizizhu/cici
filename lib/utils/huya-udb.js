const rp = require('request-promise')
const PHPUnserialize = require('php-unserialize')

const HUYA_UDB_URL = 'http://v-webapi.huya.com/api_udb2.php'

exports.isLogin = async o => {
  var phpRet = await rp.post({
    url: HUYA_UDB_URL,
    form: o
  })

  var ret
  if (isNaN(phpRet)) {
    ret = PHPUnserialize.unserialize(phpRet)
  } else {
    ret = parseInt(phpRet) > 0
  }

  return Promise.resolve(ret)
}
