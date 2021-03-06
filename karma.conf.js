// Karma configuration
// Generated on Wed Mar 19 2014 20:14:19 GMT-0300 (Hora oficial do Brasil)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
        'public/js/framework/jquery-2.1.1.min.js',
		'public/js/framework/angular.min.js',
        'public/js/framework/angular-route.min.js',
		'public/js/framework/angular-resource.min.js',
		'public/js/framework/bootstrap.min.js',
		'public/js/framework/moment.min.js',
		'public/js/framework/highcharts.js',
        'public/js/framework/select2.min.js',

		'public/js/application/services/config.js',
        'public/js/application/services/services.js',
		'public/js/application/app.js',
        'public/js/application/services/lib.js',
		'public/js/application/services/*Service.js',
		'public/js/application/**/*.js',

        'tests/frontend/helpers/helper.js',

        'tests/frontend/mocks/angular-mocks.js',

		'tests/frontend/**/*_test.js'
	],

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],
	
	preprocessors: {
      'public/js/application/**/*.js': ['coverage']
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome', 'Firefox', 'Safari', 'IE', 'ChromeCanary'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 120000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
