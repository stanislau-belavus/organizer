"use strict";

import ReducerNames from 'constants/reducer_names';

const getUserId = (state) => {
    return state.getIn([ReducerNames.AUTHORIZATION, 'userId']);
};

export {
    getUserId
};