'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports {
	entry: {
		src: {

		}
	},

	output: {

	},

	module: {
		 preLoaders: [
            {
                test: /\.js$|.jsx$/,
                exclude: /node_modules/,
                loaders: ['eslint']
            }
        ]	
	},

	postcss: [
        autoprefixer({ browsers: ['last 2 version'] }),
    ],
}