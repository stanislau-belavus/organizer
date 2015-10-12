'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.join(__dirname, '../src'),
	entry: '../src/client/Main.react.es',

    publicPath: 'http://localhost:8080/assets/',

	output: {
		path: path.join(__dirname, '../bundle/'),
        filename: 'bundle.js',
        chunkFilename: 'chunks.js',
        publicPath: 'http://localhost:8080/assets/'
	},

	module: {
        loaders: [
            { 
            	test: /\.es/, 
            	loader: 'babel-loader?stage=0&optional=runtime' 
            },
            { 
            	test: /\.(sass|scss)$/, 
            	loader: ExtractTextPlugin.extract('style', 'css-loader?minimize!sass-loader') 
            },
            { 
            	test: /\.css$/, 
            	loader: ExtractTextPlugin.extract('style', 'css-loader?minimize') 
            }
       ]
    },

    plugins: [
        new ExtractTextPlugin('bundle.css'),

        new webpack.HotModuleReplacementPlugin(),
    ]
};