define(function(require) {
    var Backbone = require('backbone'),
        Product = require('./EmpDetail');

    return Backbone.Collection.extend({
        model : EmpDetail
    });
});
