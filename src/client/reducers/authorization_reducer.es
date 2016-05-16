"use strict";

import Immutable from 'immutable';
import NotesActionTypes from 'constants/action_types/notes_action_types';
import ReducerNames from 'constants/reducer_names';


export default (state, action) => {
    const currentState = state.get(ReducerNames.AUTHORIZATION);
    let {data, type} = action;
    switch (type) {
        default:
            return currentState;
    }
};