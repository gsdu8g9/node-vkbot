'use strict';

/**
 * Module dependencies.
 * @private
 */
const webpackMerge      = require('webpack-merge');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrors    = require('friendly-errors-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.config');

// Hot reload
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./.manage/dev/client.js'].concat(baseWebpackConfig.entry[name])
});

module.exports = webpackMerge(baseWebpackConfig, {
  module: {
    loaders: [
      {
        test:   /\.css$/, 
        loader: 'vue-style-loader!css-loader'
      }, 
      {
        test:   /\.postcss$/, 
        loader: 'vue-style-loader!css-loader'
      }, 
      {
        test:   /\.less$/, 
        loader: 'vue-style-loader!css-loader!less-loader'
      }, 
      {
        test:   /\.sass$/, 
        loader: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
      }, 
      {
        test:   /\.scss$/, 
        loader: 'vue-style-loader!css-loader!sass-loader'
      }, 
      {
        test:   /\.stylus$/, 
        loader: 'vue-style-loader!css-loader!stylus-loader'
      }, 
      {
        test:   /\.styl$/, 
        loader: 'vue-style-loader!css-loader!stylus-loader'
      }
    ]
  }, 

  devtool: '#eval-source-map', 

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }), 
    new webpack.optimize.OccurrenceOrderPlugin(), 
    new webpack.HotModuleReplacementPlugin(), 
    new webpack.NoErrorsPlugin(), 
    new HtmlWebpackPlugin({
      filename: 'index.html', 
      template: './src/www/frontend/index.pug', 
      inject:   false
    }), 
    new FriendlyErrors()
  ]
});