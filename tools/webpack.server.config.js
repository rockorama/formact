const {
  DefinePlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
} = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'index.js',
    chunkFilename: '[id].js',
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(autotrack|dom-utils))/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
    ]
  },
  externals: [
    nodeExternals()
  ],
  target: 'node',
  plugins: [
    new DefinePlugin(Object.assign(
      {},
      {
      '__dirname': JSON.stringify(__dirname),
      'window': 'undefined',
    }))
  ],
}
