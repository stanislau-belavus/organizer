import React from 'react';
import Router, { Route, Redirect } from 'react-router';
import RouteNames from 'constants/route_names';
import AppContainer from 'components/app_container';
import ExampleComponent from 'components/example/example';

const router = _.assign(Router.create({
    routes: (
        <Route path='/' name={RouteNames.APP} handler={AppContainer}>
            <Route path='example' name={RouteNames.EXAMPLE_ROUTE_NAME} handler={ExampleComponent} />
            <Redirect from='/' to={RouteNames.EXAMPLE_ROUTE_NAME} />
        </Route>
    ),

    location: Router.HashLocation
}), RouteNames, {});

export default router;
