import Immutable from 'immutable';
import NotesActionTypes from 'constants/action_types/notes_action_types';
import ReducerNames from 'constants/reducer_names';

const addNewNote = (state, action) => {
    let notes = state.getIn([ReducerNames.NOTES, 'notes']);
    notes = notes.push({
        title: 'Note title',
        body: 'Note body'
    });
    state = state.setIn([ReducerNames.NOTES, 'notes'], notes);
    return state.get(ReducerNames.NOTES);
};

export default (state, action) => {
    const currentState = state.get(ReducerNames.NOTES);
    let {data, type} = action;
    switch (type) {
        case NotesActionTypes.ADD_NEW_NOTE:
            return addNewNote(state, data);
        default:
            return currentState;
    }
};