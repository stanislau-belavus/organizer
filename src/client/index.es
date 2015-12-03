'use strict';

import React from 'react';
import { updateRoute } from './actions/router_actions';
import store from './store/app_store';
import router from './router/router';

(() => {
    let routeHandler = null;
    const reactDomElement = document.getElementById('react-container');

    store.subscribe(() => {
        if (routeHandler != null) {
            React.render(React.createElement(routeHandler, { appState: store.getState() }), reactDomElement);
        }
    });

    router.run((Handler, routerState) => {
        routeHandler = Handler;
        updateRoute(routerState);
    });
})();
