const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractStyle = new ExtractTextPlugin({
  filename: 'css/[name]_[contenthash:8].css',
  allChunks: true
})

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
    }, {
      test: /\.s?css$/,
      use: extractStyle.extract({
        use: [
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        fallback: 'style-loader'
      })
    }, {
      test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }]
    }]
  },
  plugins: [
    extractStyle
  ]
}
