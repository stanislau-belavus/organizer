import store from 'store/app_store';
import AuthorizationActionTypes from 'constants/action_types/notes_action_types';
import request from 'utils/request';

const login = (username, password) => {
    request.post('authorization/login', { username, password }).then((response) => {
        console.log(response);
    }, () => {});
};

export default {
    login
}