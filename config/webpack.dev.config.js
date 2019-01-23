const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackCommonConfig = require('./webpack.common.config');

const config = {
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, '../public'),
  },
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    stats: 'minimal',
  },
};

module.exports = merge(webpackCommonConfig, config);
