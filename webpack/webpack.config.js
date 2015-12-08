var path = require('path'),
    Webpack = require('webpack'),
    server = require('./utils/app-server');
    ExtractTextPlugin = require("extract-text-webpack-plugin");

var NODE_ENV = process.env.NODE_ENV; //variable of the scope

module.exports = {
    entry: {
        victoria: [
            'webpack-dev-server/client',
            'webpack/hot/dev-server',
            path.join(__dirname, '../src/client/')
        ]
    },

    output: {
        path: path.join(__dirname, '../src/client/build'),
        filename: '[name]-build.js',
        publicPath: '/'
    },

    module: {
        loaders: [
            { test: /\.(jsx|es)$/, loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0' },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.json5$/, loader: 'json5-loader' },
            { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10000' },
            { test: /\.(woff|woff2)$/, loader: 'url-loader?limit=100000' },
            { test: /\.(ttf|eot|wav|mp3|svg|eot|woff|woff2)$/, loader: 'file?name=[name].[ext][hash]' },
            { test: /\.(wav|mp3)$/, loader: 'file-loader' },
            { test: /\.html/, loader: 'html-loader' },
            { test: /\.(sass|scss)$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize!sass-loader') },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize') }
       ]
    },

    progress: true,
    devtool: NODE_ENV === 'development' ? "cheap-inline-module-source-map" : null,

    resolve: {
        extensions: ['', '.jsx', '.js', '.es', '.json', 'css', 'scss']
    },

    plugins: [
        new ExtractTextPlugin('[name]-build.css'),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NoErrorsPlugin(),

        new Webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify('development')
            }
        }),

        function () {
            this.plugin("done", function(stats) {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1)
                {
                    console.log(stats.compilation.errors);
                } else {
                    console.log('success build');
                    server();
                }
            });
        }
    ]
};
