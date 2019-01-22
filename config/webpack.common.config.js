const path = require('path');
const htmlWebpackPlugin = require('./htmlWebpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src',
  output: {
    path: path.resolve(__dirname, '../public'),
    publicPath: '/',
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(bmp|gif|jpe?g|png)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'public/static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourcemap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules'),
    ],
    extensions: ['.js', '.json', '.jsx', '.scss'],
  },
  plugins: [
    htmlWebpackPlugin(),
  ],
};
