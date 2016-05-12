
exports.config = {
    allScriptsTimeout: 11000,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    suites: {
        paging: 'integration/test.js'
    }
};