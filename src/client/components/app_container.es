import React from 'react';
import { RouteHandler } from 'react-router';
import HeaderContainer from 'components/header/header';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { getUserId } from 'selectors/authorization_selectors';
import AuthorizationActions from 'actions/authorization_actions';
injectTapEventPlugin();

// passing appState in general incorrect
@DragDropContext(HTML5Backend)
export default class AppContainer extends React.Component {
    render() {
        let {appState} = this.props;
        AuthorizationActions.isLogin(getUserId(appState));
        
        // TODO remove appState from HeaderComponent
        return (
            <div>
                <HeaderContainer appState={appState} />
                <RouteHandler appState={appState} />
            </div>
        );
    }
}
