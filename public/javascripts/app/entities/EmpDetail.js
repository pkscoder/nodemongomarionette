define(function(require) {
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        emp_name: '',
        emp_email: '',
        emp_age: '',
        emp_location: ''
    });

});
