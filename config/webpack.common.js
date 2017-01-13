var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts'],
    root: helpers.root('src')
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
        ]
      },
      {
        test: /\.scss$/,
        exclude: helpers.root('node_modules'),
        loader: "css-to-string!css?root=assets!sass"
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.xlf$/,
        loader: 'raw'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap?root=assets')
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loaders: [
          'file?name=assets/[name].[hash].[ext]',
          'image-webpack'
        ]
      }
    ]
  },
  sassLoader: {
    includePaths: [helpers.root('src', 'assets', 'css')]
  },

  imageWebpackLoader: {
    pngquant:{
      quality: "65-90",
      speed: 4
    },
    svgo:{
      plugins: [
        {
          removeViewBox: false
        },
        {
          removeEmptyAttrs: false
        }
      ]
    }
  },

  htmlLoader: {
    root: helpers.root('src', 'assets'),
  },

  plugins: [

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/favicon.ico'
    })
  ]
};
