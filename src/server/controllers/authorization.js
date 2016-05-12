'use strict';

const register = (req, res, next) => {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
};

const login = (req, res, next) => {
    console.log('\nsession create -- -- -\n');
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};

export default {
    register,
    login
}