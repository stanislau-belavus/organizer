import store from 'store/app_store';
import AuthorizationActionTypes from 'constants/action_types/notes_action_types';
import request from 'utils/request';
import RouteNames from 'constants/route_names';
import router from 'router/router';

const login = (username, password) => {
    request.post('authorization/login', { username, password }).then((response) => {
        console.log(response);
    }, () => {});
};

const isLogin = (userId) => {
    if(userId) {
        return true;
    }
    else {
        router.transitionTo(RouteNames.AUTHORIZATION_PAGE);
        return false;
    }
};

export default {
    login,
    isLogin
}