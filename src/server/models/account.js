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

export default mongoose.model('Account', AccountSchema);