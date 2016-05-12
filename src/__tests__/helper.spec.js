'use strict';

import sinon from 'sinon';

before(() => {
    global.App = {};
    global.App.locale = 'en-US';
    sinon.stub.returnsWithResolve = function returnsWithResolve(data) {
        return this.returns(Promise.resolve(data));
    };

    sinon.stub.returnsWithReject = function returnsWithReject(error) {
        return this.returns(Promise.reject(error));
    };
});

beforeEach(() => {
    delete process.env.BROWSER;
    global.sandbox = sinon.sandbox.create();
});

afterEach(() => {
    delete process.env.BROWSER;
    global.sandbox.restore();
});
