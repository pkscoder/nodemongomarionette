define(function (require) {

    var $ = require('jquery'),
     _ = require('underscore'),
     Backbone = require('backbone'),
     Marionette = require('marionette');

    var App = new Marionette.Application();

    var Models = {
        EmpDetail: require('entities/EmpDetail')
    };

    App.addRegions({
        appHeader: "#app-header"
    });

    App.navigate = function(route,  options){
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    App.getCurrentRoute = function(){
        return Backbone.history.fragment;
    };

    App.on("initialize:after", function () {
        if(Backbone.history){
            Backbone.history.start({ pushState: true });
            require(["ui_modules/home/home_app"], function () {
                if(App.getCurrentRoute() === ""){
                    App.trigger("user:home");
                }
            });
        }
    });
    return App;
});

