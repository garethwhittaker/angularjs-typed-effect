module.exports = function(config) {
    config.set({
        // Test frameworks to use.
        frameworks: ['jasmine'],

        // Files to load in browser(s).
        // Note: These are loaded in the listed order.
        // http://karma-runner.github.io/0.13/config/files.html
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/typed-effect.js',
            'src/typed-effect.spec.js'
        ],

        // List reporters to utilise.
        reporters: ['progress', 'coverage'],

        // Specify any pre-processing of files before serving to the browser.
        preprocessors: {
            'src/typed-effect.js': ['coverage']
        },

        // Browser(s) to launch and capture.
        // http://karma-runner.github.io/0.13/config/browsers.html
        browsers: ['Chrome']
    });
};
