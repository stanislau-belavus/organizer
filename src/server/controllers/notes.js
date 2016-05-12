'use strict';

import mongoose from 'mongoose';
import NotesModel from '../models/notes';
import configStyleNotes from '../../client/constants/notes_colors_config';

const createNewNote = (request, response) => {
    let noteRandomStyle = configStyleNotes[Math.floor(Math.random()*configStyleNotes.length)];
    return new Promise((resolve) => {
        NotesModel.getLastPosition().then((position) => {
            NotesModel.createNewNote({
                style: noteRandomStyle,
                position
            }).then((data) => {
                response.json({
                    status: 'ok'
                });
                resolve();
            });
        });
    });
};

const getNotes = (request, response) => {
    return new Promise((resolve) => {
            NotesModel.getAll().then((data) => {
            response.json({
                status: 'ok',
                notes: data
            });
            resolve();
        });
    });
};

const removeNote = (request, response) => {
    let {body} = request;
    let {id} = body;

    return new Promise((resolve) => {
        NotesModel.removeNote({ _id: id }).then(() => {
            response.json({
                status: 'ok'
            });
            resolve();
        });
    });
};

const updateOrder = (request, response) => {
    let {body} = request;
    let {dropNote, dragNote} = body;

    return new Promise( (resolve) => {
        NotesModel.updateOrder(dropNote, dragNote).then(() => {
            response.json({
                status: 'ok'
            });
            resolve();
        });
    });
};

const updateNote = (request, response) => {
    let {body} = request;
    let {note} = body;

    NotesModel.updateNote(note).then(() => {
        response.json({
            status: 'ok'
        });
    });
};

const undoNotes = (request, response) => {
    return new Promise((resolve) => {
        NotesModel.undoNotes().then(() => {
            response.json({
                status: 'ok'
            });
            resolve();
        });
    });
};

export default { 
    createNewNote,
    getNotes,
    removeNote,
    updateOrder,
    updateNote,
    undoNotes
}