'use strict';

import express from 'express';
import passport from 'passport';
import notesCtrl from '../controllers/notes';
import authCtrl from '../controllers/authorization';

const router = express.Router();

router.post('/notes/create', notesCtrl.createNewNote)
    .post('/notes/remove', notesCtrl.removeNote)
    .post('/notes/updateOrder', notesCtrl.updateOrder)
    .post('/notes/update', notesCtrl.updateNote)
    .post('/notes/undo', notesCtrl.undoNotes)
    .get('/notes/getNotes', notesCtrl.getNotes);

router.post('/authorization/login', authCtrl.login)
/*.post('/authorization/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: 'Account not login' }, authCtrl.login))*/
    .post('/authorization/register', authCtrl.register)
    .get('/login', (req, res, err) => { console.log('BODY', req.query ); });

export default router;
