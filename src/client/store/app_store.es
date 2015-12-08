import { createStore, combineReducers } from 'redux';
import { routerReducer } from 'reducers/router_reducer';

const reducers = combineReducers({
    router: routerReducer
});
const store = createStore(reducers);

export default store;
