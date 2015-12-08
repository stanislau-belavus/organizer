'use strict';

require('babel-core/register');

delete process.env.BROWSER;

require('./app.js').start();

/*
'use strict';

//require('babel/register-without-polyfill');

delete process.env.BROWSER;
//process.env.NODE_PATH = 'src';

// require('module').Module._initPaths();
// require('locale/init')();
require('./server/app.js').start();
*/