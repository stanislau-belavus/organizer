"use strict";

import Immutable from 'immutable';
import AuthorizationActionTypes from 'constants/action_types/authorization_action_types';
import ReducerNames from 'constants/reducer_names';

const saveUser = (state, data) => {
    let {errorMsg, account} = data;
    let {id, login} = account ? account : {};
    if(errorMsg) {
        state = state.setIn([ReducerNames.AUTHORIZATION, 'errorMsg'], errorMsg);
        state = state.setIn([ReducerNames.AUTHORIZATION, 'username'], null);
        state = state.setIn([ReducerNames.AUTHORIZATION, 'userId'], null);
    } else {
        state = state.setIn([ReducerNames.AUTHORIZATION, 'errorMsg'], null);
        state = state.setIn([ReducerNames.AUTHORIZATION, 'username'], login);
        state = state.setIn([ReducerNames.AUTHORIZATION, 'userId'], id);
    }

    return state.get(ReducerNames.AUTHORIZATION);
};

export default (state, action) => {
    const currentState = state.get(ReducerNames.AUTHORIZATION);
    let {data, type} = action;
    switch (type) {
        case AuthorizationActionTypes.LOGIN:
            return saveUser(state, data);
        case AuthorizationActionTypes.REGISTER:
            return saveUser(state, data);
        default:
            return currentState;
    }
};