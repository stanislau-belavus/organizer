'use strict';

import AccountModel from '../models/account';

const register = (req, res, next) => {
    let {username, password, repeatPassword} = req.body;
    let errorMsg = '';
    if(!username) { errorMsg = 'Not correct login'; }

    AccountModel.findUser({ login: username }).then((account) => {
        if (err || account) { errorMsg = 'Login already exist'; }
        if (!password || password !== repeatPassword) {  errorMsg = 'Password isn\'t correct'; }
        
        if(!errorMsg) {
            AccountModel.registerUser({
                login: username,
                password
            }).then((newAccount) => {
                if (err) { errorMsg = 'Error registration. Try again.'; }
                else {
                    return res.json({
                        account: errorMsg ? {} : newAccount,
                        errorMsg
                    });
                }
            });
        } else {
            return res.json({
                account: errorMsg ? {} : account,
                errorMsg
            });
        }

    });
    // Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    //     if (err) {
    //       return res.render('register', { error : err.message });
    //     }

    //     passport.authenticate('local')(req, res, function () {
    //         req.session.save(function (err) {
    //             if (err) {
    //                 return next(err);
    //             }
    //             res.redirect('/');
    //         });
    //     });
    // });
};

const login = (req, res, next) => {
    let {username, password} = req.body;
    let errorMsg = '';

    if(!username) { errorMsg = 'Not correct login'; }
    AccountModel.findUser({ login: username }).then((account) => {
        if (!account) { errorMsg = 'Not exist login'; }
        else if (password !== account.password) {  errorMsg = 'Not correct password'; }

        return res.json({
            account: errorMsg ? {} : account,
            errorMsg
        });
    });
    // console.log('\nsession create -- -- -\n');
    // req.session.save(function (err) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.redirect('/');
    // });
};

export default {
    register,
    login
}