module.exports = function (wallaby) {
    return {
        bootstrap: function() {
            global.fetch = require('node-fetch');
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
