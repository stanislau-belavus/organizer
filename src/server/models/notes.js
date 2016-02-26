'use strict';

import mongoose from 'mongoose';
import async from 'async';

const Schema = mongoose.Schema;

let NoteSchema = new Schema({
    title: { type: String, required: true, default: 'Note title' },
    body: { type: String, required: true, default: 'Note body' },
    style: { type: Object, required: true, default: {} },
    position: { type: Number, required: true, default: 0 }
});

NoteSchema.set('toObject', { virtuals: true });
NoteSchema.set('toJSON', { virtuals: true });

NoteSchema.statics.getLastPosition = function (condition={}) {
    return new Promise((resolve) => {
        this.find(condition, (error, notes) => {
            if(error) {
                resolve(0);
            }
            else {
               resolve(notes.length); 
            }
        });
    });
};

NoteSchema.statics.getAll = function (condition = {}) {
    return new Promise((resolve, reject) => {
        this.find(condition).sort('position').exec((error, data) => {
            if (!error) {
                resolve(data);
            } else {
                reject(error);
            }
        });
    });
};

NoteSchema.statics.removeNote = function (condition = {}) {
    return new Promise((resolve, reject) => {
        this.remove(condition, (error, data) => {
            if (!error) {
                resolve(data);
            } else {
                reject(error);
            }
        });
    });
};

NoteSchema.statics.createNewNote = function (data = {}) {
    return new Promise((resolve, reject) => {
        let newNote = new this(data);
        newNote.save((error, data) => {
            if (!error) {
                resolve(data);
            } else {
                reject(error);
            }
        });
    });
};

NoteSchema.statics.updateOrder = function (dropNote, dragNote) {
    return new Promise((resolve, reject) => {
        async.waterfall([(cb) => {
            this.findOne({ _id: dragNote.id }).exec(cb);
        },
        (note, cb) => {
            if(note) {
                note.position = dropNote.position;
                note.save(() => {
                    cb(null);
                });
            }
        },
        (cb) => {
           this.findOne({ _id: dropNote.id }).exec(cb);
        },
        (note, cb) => {
            if(note) {
                console.log('\n------\n', dragNote.position, dropNote.position, '\n-------\n');
                note.position = dragNote.position;
                note.save(() => { cb(null); });
            }
        }], (error) => {
            if (!error) {
                resolve();
            } else {
                reject(error);
            }
        })
    });
};

export default mongoose.model('Note', NoteSchema);
