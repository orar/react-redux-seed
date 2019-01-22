const path = require('path');
const merge = require('webpack-merge');
const webpackCommonConfig= require('./webpack.common.config');
const htmlWebpackPlugin = require('./htmlWebpack');


const config = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../public'),
    publicPath: '/',
  },
  plugins: [
    htmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        preserveLineBreaks: true,
        useShortDoctype: true,
        html5: true,
      },
    }),
  ],
  devtool: 'source-map',
};

module.exports = merge(webpackCommonConfig, config);
