import store from 'store/app_store';
import AuthorizationActionTypes from 'constants/action_types/authorization_action_types';
import request from 'utils/request';
import RouteNames from 'constants/route_names';
import router from 'router/router';

const login = (username, password) => {
    request.post('authorization/login', { username, password }).then((response) => {
        store.dispatch({
            type: AuthorizationActionTypes.LOGIN,
            data: response || {}
        });
    }, () => {});
};

const register = (username, password, repeatPassword) => {
    request.post('authorization/register', { username, password, repeatPassword }).then((response) => {
        store.dispatch({
            type: AuthorizationActionTypes.REGISTER,
            data: response || {}
        });
    }, () => {});
};

const isLogin = (userId, needRedirect) => {
    if(userId) {
        if(needRedirect) { router.transitionTo(RouteNames.NOTES_PAGE); };
        return true;
    }
    else {
        router.transitionTo(RouteNames.AUTHORIZATION_PAGE);
        return false;
    }
};

export default {
    login,
    isLogin,
    register
}