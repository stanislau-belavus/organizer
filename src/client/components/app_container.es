import React from 'react';
import { RouteHandler } from 'react-router';
import HeaderContainer from './header/header';

// passing appState in general incorrect
export default class AppContainer extends React.Component {
    render() {
        // TODO remove appState from HeaderComponent
        return (
            <div>
                <HeaderContainer appState={this.props.appState} />
                <RouteHandler appState={this.props.appState} />
            </div>
        );
    }
}
