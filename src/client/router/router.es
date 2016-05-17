import React from 'react';
import Router, { Route, Redirect } from 'react-router';
import RouteNames from 'constants/route_names';
import AppContainer from 'components/app_container';
import ExampleComponent from 'components/example/example';
import AuthorizationPage from 'components/pages/Authorization.react';
import NotesPage from 'components/pages/Notes.react';

const router = _.assign(Router.create({
    routes: (
        <Route path='/' name={RouteNames.APP} handler={AppContainer}>
            <Route path='example' name={RouteNames.EXAMPLE_ROUTE_NAME} handler={ExampleComponent} />
            <Route path='authorization' name={RouteNames.AUTHORIZATION_PAGE} handler={AuthorizationPage} />
            <Route path='notes' name={RouteNames.NOTES_PAGE} handler={NotesPage} />
            <Redirect from='/' to={RouteNames.NOTES_PAGE} />
        </Route>
    ),

    location: Router.HashLocation
}), RouteNames, {});

export default router;