var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var buildConfig = require('./webpack.build.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(buildConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});
