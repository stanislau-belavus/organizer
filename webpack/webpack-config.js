'use strict';

var webpack = require('webpack');
//var autoprefixer = require('autoprefixer');
var bundle = require('./utils/bundle.js');
var server = require('./utils/server');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
        main: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            path.join(__dirname, '../src/client'),
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
        preLoaders: [
            {
                test: /\.js$|.jsx$/,
                exclude: /node_modules/,
                loaders: ['eslint']
            }
        ],
        loaders: [
            { 
            	test: /\.es|.jsx$/, 
            	loader: 'babel-loader?stage=0&optional=runtime' 
            },
            { 
            	test: /\.(sass|scss)$/, 
            	loader: ExtractTextPlugin.extract('style', 'css-loader?minimize!sass-loader') 
            },
            {
                test: /\.json$/,
                loader: 'json'
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

        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify('development')
            }
        }),
        
        function () {
            this.plugin('done', bundle);
        },

        function () {
            this.plugin('done', server);
        }
    ],
    
    resolve: require('./shared/resolve'),
    eslint: {
        configFile: './.eslintrc'
    }
};