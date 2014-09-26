//Import the mongoose module
var mongoose = require('mongoose');
var db = 'mongodb://localhost/empDetailDB';              //Change database name here
var mongoOption = {db:{safe:true}};
mongoose.connect(db ,mongoOption, function(err, res){
    if(err){
        console.log('There is an error in database connection');
    }
});

var empDetailSchema = new mongoose.Schema({
    emp_name : String,
    emp_email : String,
    emp_age : String,
    emp_location : String,
    dateOfCreation : {type: Date, default: Date.now }
});

var EmpDetail = mongoose.model('EmpDetail', empDetailSchema);