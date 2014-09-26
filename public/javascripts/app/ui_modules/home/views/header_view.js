    define(function(require) {
    var $= require('jquery');
    var Backbone = require('backbone');
    var _= require('underscore');
    var Marionette = require('marionette');
    var template = _.template(require('text!./templates/header.html'));
    var EmpDetail = require('../../../entities/EmpDetail');

    var empDetail = new EmpDetail();

    return Backbone.Marionette.ItemView.extend({
        events: {
            "click #showDiv_ToAddEmp": 'showDiv_ToAddEmp',
            "click #addEmployeeToDB" : 'storeEmpDetail',
            "click .deleteEmployee" : 'deleteSingleEmployee',
            "click .editEmployee" : 'showEditAndFetchSingleData',
            "click #editEmployeeToDB" : 'updateEmployeeDetail'
        },

        initialize: function(el) {
            _.bindAll(this);
        },

        render: function(el){
            this.$el.html(template());
            this.displayEmployeeDetail();
            return this;
        },

        showDiv_ToAddEmp: function(){
            this.$el.find('#addNewEmployeeDiv').show();
            this.$el.find('#addEmployeeToDB').show();
            this.$el.find('#editEmployeeToDB').hide();
        },

        storeEmpDetail: function(){
            var self = this;
            var emp_name = this.$el.find('#emp_name').val();
            var emp_email = this.$el.find('#emp_email').val();
            var emp_age = this.$el.find('#emp_age').val();
            var emp_location = this.$el.find('#emp_location').val();

            empDetail.set('emp_name', emp_name);
            empDetail.set('emp_email', emp_email);
            empDetail.set('emp_age', emp_age);
            empDetail.set('emp_location', emp_location);

            empDetail.url = '/employeedetail/save';

            empDetail.save({},{
                success: function(model, response){
                    if(response.msg == 'success'){
                        alert('Data saved Successfully');
                        self.$el.find('#addNewEmployeeDiv').hide();
                        self.$el.find('#addEmployeeToDB').hide();
                        self.$el.find('#editEmployeeToDB').hide();
                        self.displayEmployeeDetail();
                    }
                }
            });
        },

        displayEmployeeDetail: function(){
            this.$el.find('#displayEmployeeDetailDiv').html('');
            var self = this;
            empDetail.url = '/employeedetail/fetchdetail';
            empDetail.fetch({
                success: function(model, response){
                    var empArray = response.documents;
                    if(empArray){
                        for(var key in empArray){
                            self.$el.find('#displayEmployeeDetailDiv').append(
                                '<li class="empList">' +
                                    '<div class="empSingleDetail">'+ empArray[key].emp_name +'</div>' +
                                    '<div class="empSingleDetail">'+ empArray[key].emp_email +'</div>' +
                                    '<div class="empSingleDetail">'+ empArray[key].emp_age +'</div>' +
                                    '<div class="empSingleDetail">'+ empArray[key].emp_location +'</div>' +
                                    '<div class="empSingleDetail" style="border-right: 0px;">' +
                                    '<a class="editEmployee" id="'+ empArray[key]._id +'">Edit</a> / <a class="deleteEmployee" id="'+ empArray[key]._id +'">Delete</a>' +
                                    '</div>' +
                                '</li>'
                            );
                        }
                    }
                }
            });
        },

        deleteSingleEmployee: function(e){
            var self = this;
            var id = e.target.id;
            empDetail.url = '/deleteEmployee/'+id;

            empDetail.save({},{
                success: function(model, response){
                    if(response.msg == 'success'){
                        alert('Data deleted Successfully');
                        self.displayEmployeeDetail();
                    }
                }
            });
        },

        showEditAndFetchSingleData: function(e){
            var self = this;
            var id = e.target.id;
            empDetail.url = '/fetchSingleEmployee/'+id;

            empDetail.fetch({
                success: function(model, response){
                    var empArray = response.result;
                    if(empArray){
                        for(var key in empArray){
                            self.$el.find('#addNewEmployeeDiv').show();
                            self.$el.find('#addEmployeeToDB').hide();
                            self.$el.find('#editEmployeeToDB').show();

                            self.$el.find('#emp_name').val(empArray[key].emp_name);
                            self.$el.find('#emp_email').val(empArray[key].emp_email);
                            self.$el.find('#emp_age').val(empArray[key].emp_age);
                            self.$el.find('#emp_location').val(empArray[key].emp_location);
                            self.$el.find('#editEmployeeToDB').attr('name',empArray[key]._id);
                        }
                    }
                }
            });
        },

        updateEmployeeDetail : function(){
            var id = this.$el.find('#editEmployeeToDB').attr('name');
            var emp_name = this.$el.find('#emp_name').val();
            var emp_email = this.$el.find('#emp_email').val();
            var emp_age = this.$el.find('#emp_age').val();
            var emp_location = this.$el.find('#emp_location').val();

            var self = this;

            empDetail.set('emp_name', emp_name);
            empDetail.set('emp_email', emp_email);
            empDetail.set('emp_age', emp_age);
            empDetail.set('emp_location', emp_location);

            empDetail.url = '/updateSingleEmployeeDetail/'+id;

            empDetail.save({},{
                success: function(model, response){
                    if(response.msg == 'success'){
                        alert('Data Updated Successfully');
                        self.$el.find('#addNewEmployeeDiv').hide();
                        self.$el.find('#addEmployeeToDB').hide();
                        self.$el.find('#editEmployeeToDB').hide();
                        self.displayEmployeeDetail();
                    }
                }
            });
        }
    });
});
