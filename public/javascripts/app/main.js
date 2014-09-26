define(function(require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Marionette = require('marionette');

    $(function(){
        app = require('./app');
        app.start();

    });
});