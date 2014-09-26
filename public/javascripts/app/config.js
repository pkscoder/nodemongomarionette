// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    waitSeconds: 2000,
    deps: [ 'main', 'jquery'],

    paths: {
        'jquery': '/javascripts/lib/jquery/jquery', 
        'underscore': '/javascripts/lib/backbone/underscore-min',
        'backbone': '/javascripts/lib/backbone/backbone',
        'marionette' : '/javascripts/lib/backbone/backbone.marionette.min',
        'text': '/javascripts/lib/text'
    },

    shim: {
        // Backbone library depends on lodash and jQuery.
        backbone: {
            deps: [ 'underscore', 'jquery' ],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        marionette : {
            deps : ['jquery', 'underscore', 'backbone'],
            exports : 'Marionette'
        }
    }
});
