const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    './src/js/main.js',
    './src/scss/style.scss'
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [{
        test: /\.js?$/,
        exclude: [/(node_modules)/, /\.spec\.js$/],
        include: [
          path.resolve(__dirname, '../js')
        ],
        use: []
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
              {
                  loader: 'css-loader',
                  options: { sourceMap: true }
              },
              {
                  loader: 'sass-loader',
                  options: { sourceMap: true }
              }
          ],
          fallback: 'style-loader',
      })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(
      '[name].css'
    ),
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html')
    }),
    new WorkboxPlugin.GenerateSW(),
  ],
  devServer: {
    contentBase: path.join(__dirname, '../'),
    compress: true,
    historyApiFallback: true
  }
};
