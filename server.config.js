module.exports = {
  apps: [{
    interpreter: 'babel-node',
    interpreter_args: '--harmony',
    name: 'cici.fed.huya.com',
    script: './server.js',
    watch: false
  }],
  env: {
    NODE_ENV: 'prod'
  }
}
