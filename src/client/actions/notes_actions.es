"use strict";

import store from 'store/app_store';
import NotesActionTypes from 'constants/action_types/notes_action_types';

const addNewNote = () => {
    store.dispatch({
        type: NotesActionTypes.ADD_NEW_NOTE
    });
};

export default {
    addNewNote
};