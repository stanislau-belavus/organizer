'use strict';

var webpack = require('webpack');
//var autoprefixer = require('autoprefixer');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	//context: path.join(__dirname, '../src'),
	entry: {
        main: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            path.join(__dirname, '../src'),
        ]
    },

    publicPath: 'http://localhost:8080/assets/',

	output: { 
		path: path.join(__dirname, '../dist/'),
        filename: '[name]-dev.js',
        chunkFilename: '[name].js',
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
        new ExtractTextPlugin('[name]-dev.css'),

        new webpack.HotModuleReplacementPlugin(),
    ],
    
    resolve: require('./shared/resolve')
};