"use strict";

import ReducerNames from 'constants/reducer_names';

const getUserId = (state) => {
    return state.getIn([ReducerNames.AUTHORIZATION, 'userId']);
};

const getUser = (state) => {
    return state.get(ReducerNames.AUTHORIZATION);
};

export {
    getUserId,
    getUser
};