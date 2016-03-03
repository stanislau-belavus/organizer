'use strict';

import express from 'express';
import notesCtrl from '../controllers/notes';

const router = express.Router();

router.post('/notes/create', notesCtrl.createNewNote)
    .post('/notes/remove', notesCtrl.removeNote)
    .post('/notes/updateOrder', notesCtrl.updateOrder)
    .post('/notes/update', notesCtrl.updateNote)
    .post('/notes/undo', notesCtrl.undoNotes)
    .get('/notes/getNotes', notesCtrl.getNotes);

export default router;
