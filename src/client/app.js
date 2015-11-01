'use strict';

import React from 'react';
import Main from '../Main.react';

if(process.env.BROWSER) {
    window.React = React;
}

/**
 * Main entry-point
*/

React.render(<Main/>, document.body);

