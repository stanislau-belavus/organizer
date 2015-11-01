'use strict';

var cp = require('child_process');
var path = require('path');
var watch = require('node-watch');
var opener = require('opener');
var _ = require('lodash');
var CLIEngine = require("eslint").CLIEngine;

var cli = new CLIEngine({
    useEslintrc: true,
    ignore: true
});

var APP_PATH = path.join(__dirname, '../../src');
var WATCH_PATH = path.join(__dirname, '../../src/server');

var app;
var isStarted;

var startApp = function () {
    //forse dev mode;
    var env = _.assign({NODE_ENV: 'development', WEBPACK_SERVE: true}, process.env);
    // fork app process
    app = cp.fork(APP_PATH, {env: env});
    app.once('message', function(message) {
        if (message.match(/^online$/)) {
            if(!isStarted) {
                isStarted = true;
                opener('http://localhost:3000');

                watch(
                    WATCH_PATH,
                    function(file) {
                        if(!file.match('bundle.json')) {
                            var report = cli.executeOnFiles([file]);
                            var formatter = cli.getFormatter();

                            console.log(formatter(report.results));

                            if(!report.errorCount) {
                                console.log('restarting app');
                                //isServerReload = true;
                                app.kill('SIGTERM');
                                return startApp();
                            }
                        }
                    }
                );
            }
        }
    });
};

process.on('exit', function() {
    app.kill('SIGTERM');
});

module.exports = function() {
    if(!app) {
        return startApp();
    }
};
