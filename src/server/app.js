'use strict';

import express from 'express';
// import mongoMiddleware from './middleware/mongo';
// import serverMiddleware from './middleware/server';
// import logger from '../../logger';
import Promise from 'bluebird';

const app = express();

let isAppStarted = false;

app.start = async function () {
    if(!isAppStarted) {
        isAppStarted = true;
        await Promise.all([
            // serverMiddleware(app),
            // mongoMiddleware(app)
        ]);

    } else {
        await new Promise(function (resolve) {
            resolve();
        });
    }

    if (process.send) {
        process.send('online');
    }
};

module.exports = app;

if (!module.parent) {
    try {
        app.start();
    } catch(e) {
        // logger.error(e);
    }
}