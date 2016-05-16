'use strict';

import React from 'react';
import { Dialog, RaisedButton, TextField, Tabs, Tab } from 'material-ui';
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

    onRegister = () => {

    }

    render() {
        return <div>
            <Dialog contentContainerClassName='dialog-register' contentStyle={{'maxWidth': '400px'}} bodyStyle={{'padding': '0'}} open={true} modal={true} defaultOpen={true}>
               <Tabs contentContainerClassName='dialog-register__tabs'>
                    <Tab label='SIGN IN'>
                        <div className='vertical-content'>
                            <TextField
                                fullWidth={true}
                                ref='login'
                                hintText="Login"
                                floatingLabelText="Login"
                                underlineStyle={{borderColor: Colors.deepPurple600}} />
                            <TextField
                                fullWidth={true}
                                ref='password'
                                hintText="Password"
                                floatingLabelText="Password"
                                underlineStyle={{borderColor: Colors.deepPurple600}} />
                           <div> <RaisedButton fullWidth={true} onClick={ this.onLogin.bind(this) } label="Login" primary={true} /></div>
                        </div>
                    </Tab>
                    <Tab label='SIGN UP'>
                        <div className='vertical-content'>
                            <TextField
                                fullWidth={true}
                                ref='regLogin'
                                hintText="Login"
                                floatingLabelText="Login"
                                underlineStyle={{borderColor: Colors.deepPurple600}} />
                            <TextField
                                fullWidth={true}
                                ref='regPassword'
                                hintText="Password"
                                floatingLabelText="Password"
                                underlineStyle={{borderColor: Colors.deepPurple600}} />
                            <TextField
                                fullWidth={true}
                                ref='regPasswordRepeat'
                                hintText="Repeat password"
                                floatingLabelText="Repeat password"
                                underlineStyle={{borderColor: Colors.deepPurple600}} />
                            <div><RaisedButton fullWidth={true} onClick={ this.onRegister.bind(this) } label="Register" primary={true} /></div>
                        </div>
                    </Tab>
                </Tabs>
            </Dialog>
        </div>;
    }
}