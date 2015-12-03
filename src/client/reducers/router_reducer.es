import Immutable from 'immutable';
import { UPDATE_ROUTE } from '../constants/action_types/router_action_types';

const initialState = Immutable.fromJS({
    name: '',
    path: '',
    params: {},
    query: {}
});

export function routerReducer(state = initialState, action) {

    switch (action.type) {
        case UPDATE_ROUTE:
            return state.merge(action.data);

        default:
            return state;
    }
}
