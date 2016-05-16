"use strict";

import Immutable from 'immutable';
import routerReducer from 'reducers/router_reducer';
import authorizationReducer from 'reducers/authorization_reducer';
import notesReducer from 'reducers/notes_reducer';
import ReducerNames from 'constants/reducer_names';
import RouterNames from 'constants/route_names';

const reducers = {
    [ReducerNames.ROUTER]: routerReducer,
    [ReducerNames.NOTES]: notesReducer,
    [ReducerNames.AUTHORIZATION]: authorizationReducer
};

const initialState = Immutable.fromJS({
    [ReducerNames.ROUTER]: {
        name: '',
        path: '',
        params: {},
        query: {}
    }, [ReducerNames.NOTES]: {
        notes: []
    },  [ReducerNames.AUTHORIZATION]: {
        userId: null
    }
});

export default (state = initialState, action) => {
    return state.withMutations((mutableState) => {
        Object.keys(reducers).forEach((reducerName) => {
            mutableState.set(reducerName, reducers[reducerName](state, action));
        });
    });
};
