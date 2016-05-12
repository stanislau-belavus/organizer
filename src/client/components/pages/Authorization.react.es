'use strict';

import React from 'react';
import { Dialog, RaisedButton, TextField } from 'material-ui';
import { Styles } from 'material-ui';
import AuthorizationActions from 'actions/authorization_actions';

let { Colors } = Styles;

export default class AuthorizationPage extends React.Component {
    constructor(props) {
        super(props);

        this.login = '';
        this.password = '';
    }

    onLogin = () => {
        let { login, password } = this.refs;
        AuthorizationActions.login(login.getValue(), password.getValue());
    }

    render() {
        console.log(this);
        return <div>
            <Dialog open={true} modal={true} defaultOpen={true}>
                <TextField
                    ref='login'
                    hintText="Login"
                    floatingLabelText="Login"
                    underlineStyle={{borderColor: Colors.deepPurple600}} />
                <TextField
                    ref='password'
                    hintText="Password"
                    floatingLabelText="Password"
                    underlineStyle={{borderColor: Colors.deepPurple600}} />
                <RaisedButton onClick={ this.onLogin.bind(this) } label="ACCEPT" primary={true} />
                <RaisedButton label="CANCEL" secondary={true} />
            </Dialog>
        </div>;
    }
}