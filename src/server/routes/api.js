'use strict';

import express from 'express';
import notesCtrl from '../controllers/notes';

const router = express.Router();

router.post('/notes/create', notesCtrl.createNewNote)
    .post('/notes/remove', notesCtrl.removeNote)
    .post('/notes/updateOrder', notesCtrl.updateOrder)
    .get('/notes/getNotes', notesCtrl.getNotes);

export default router;
