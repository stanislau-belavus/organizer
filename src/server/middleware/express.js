 'use strict';

import path from 'path';
import helmet from 'helmet';
import hpp from 'hpp';
import bodyParser from 'body-parser';
import apiRouter from '../routes/api';
import staticsRouter from '../routes/statics';
import env from '../../../env';
import passport from 'passport';
import Account from '../models/account';
import { Strategy as LocalStrategy } from 'passport-local';

const errorHandler = (err, req, res, next) => {
    let errData = err.message ? err.message : err;

    res.status(err.status || 500);

    if (req.accepts('json')) {
        res.json({error: true, data: errData});
    } else {
        res.render('error', {
            message: err.message,
            error: {},
            title: 'error'
        });
    }
};

export default (app) => {
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs');
    app.set('port', env.get('express:port'));

    // some secure headers
    app.use(helmet.xssFilter());
    app.use(helmet.frameguard('sameorigin'));
    app.use(helmet.hidePoweredBy());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(hpp());
    app.use('/', apiRouter);
    app.use('/', staticsRouter);

    //Config passport
    //-----------------------
    app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.use(new LocalStrategy(
        (username, password, callback) => {
            Account.findOne({ username: username }, function (err, account) {
                if (err) { return callback(err); }
                if (!account) { return callback(null, false); }
                if (!account.verifyPassword(password)) { return callback(null, false); }

                return callback(null, account);
            });
        }
    ));
    passport.serializeUser(function(account, done) {
        done(null, account.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, account) {
            done(err, account);
        });
    });
    //-----------------------

    app.use(errorHandler);

    console.log('express configured');
};
