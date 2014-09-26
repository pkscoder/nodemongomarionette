define(function(require) {
    var Backbone = require('backbone'),
        _= require('underscore'),
        Marionette = require('marionette');

    var Router = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            "home": "showUserHome"
        }
    });

    var API = {
        showUserHome: function(){
            require(["ui_modules/home/home_controller"], 
                function(HomeController){
                    HomeController.showHome();
            });
        }
    };

    app.on("user:home", function(){
        app.navigate("");
        API.showUserHome();
    });

    app.addInitializer(function(){
        new Router({
            controller: API
        });
    });

    return Router;
});
