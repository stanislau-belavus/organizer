'use strict';

import mongoose from 'mongoose';
import _ from 'lodash';

const Schema = mongoose.Schema;

let AccountSchema = new Schema({
    name: { type: String, default: 'User' },
    login: { type: String, unique : true, required: true },
    password: { type: String, required: true },
});

AccountSchema.set('toObject', { virtuals: true });
AccountSchema.set('toJSON', { virtuals: true });

AccountSchema.plugin(require('mongoose-timestamp'));

AccountSchema.statics.findUser = function(condition) {
    return new Promise((resolve, reject) => {
        this.findOne(condition).exec((err, account) => {
            if(err) {
                resolve(null);
            }
            resolve(account);
        });
    });
};

AccountSchema.statics.registerUser = function(data = {}) {
    return new Promise((resolve, reject) => {
        let newAccount = new this(data);
        newAccount.save((err, account) => {
            resolve(account);
        });
    });
};

export default mongoose.model('Account', AccountSchema);