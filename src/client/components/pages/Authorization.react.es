'use strict';

import React from 'react';
import { Dialog, RaisedButton, TextField, Tabs, Tab } from 'material-ui';
import { Styles } from 'material-ui';
import AuthorizationActions from 'actions/authorization_actions';
import { getUser, getUserId } from 'selectors/authorization_selectors';

let { Colors } = Styles;

export default class AuthorizationPage extends React.Component {
    constructor(props) {
        super(props);

        this.login = '';
        this.password = '';
    }

    onRegister = () => {
        let { regLogin, regPassword, regPasswordRepeat } = this.refs;
        AuthorizationActions.register(regLogin.getValue(), regPassword.getValue(), regPasswordRepeat.getValue());
    }

    onLogin = () => {
        let { login, password } = this.refs;
        AuthorizationActions.login(login.getValue(), password.getValue());
    }

    render() {
        let {appState} = this.props;
        AuthorizationActions.isLogin(getUserId(appState), true);
        
        let user = getUser(appState);
        let errorMsg = null;
        if(user) {
            errorMsg = user.get('errorMsg');
        }
        
        return <div>
            <Dialog contentContainerClassName='dialog-register' contentStyle={{'maxWidth': '400px'}} bodyStyle={{'padding': '0'}} open={true} modal={true} defaultOpen={true}>
               <Tabs contentContainerClassName='dialog-register__tabs'>
                    <Tab label='SIGN IN'>
                        { errorMsg ? <div className='content-error'>{errorMsg}</div> : null }
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
                                type='password'
                                hintText="Password"
                                floatingLabelText="Password"
                                underlineStyle={{borderColor: Colors.deepPurple600}} />
                           <div> <RaisedButton fullWidth={true} onClick={ this.onLogin.bind(this) } label="Login" primary={true} /></div>
                        </div>
                    </Tab>
                    <Tab label='SIGN UP'>
                        { errorMsg ? <div className='content-error'>{errorMsg}</div> : null }
                        <div className='vertical-content'>
                            { errorMsg ? <div></div> : null }
                            <TextField
                                fullWidth={true}
                                ref='regLogin'
                                hintText="Login"
                                floatingLabelText="Login"
                                underlineStyle={{borderColor: Colors.deepPurple600}} />
                            <TextField
                                fullWidth={true}
                                ref='regPassword'
                                type='password'
                                hintText="Password"
                                floatingLabelText="Password"
                                underlineStyle={{borderColor: Colors.deepPurple600}} />
                            <TextField
                                fullWidth={true}
                                ref='regPasswordRepeat'
                                type='password'
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