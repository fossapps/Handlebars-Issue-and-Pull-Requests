module.exports = function (wallaby) {
    return {
        bootstrap: function() {
            var fetch = require('node-fetch');
            global.fetch = global.fetch || fetch;
            global.Request = global.Request || fetch.Request;
            global.Response = global.Response || fetch.Response;
        },
        files: [
            'src/**/*.ts',
            '!src/**/*.spec.ts'
        ],
        tests: [
            'src/**/*.spec.ts'
        ],
        env: {
            type: 'node'
        },
        testFramework: 'jasmine'
    };
};
