const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/components/hn-app.js',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      async: 'list-item',
      chunks: ['list', 'item']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'item-user',
      chunks: ['item', 'user']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'commons',
      minChunks: 2
    }),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              'syntax-dynamic-import',
              'transform-object-rest-spread'
            ]
          }
        }
      }
    ]
  }
};
