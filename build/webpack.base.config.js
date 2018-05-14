const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist',
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  }
}
