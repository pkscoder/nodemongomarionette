var mongoose = require('mongoose');
var mongodb = require('mongodb');
var Server = mongodb.Server;
var	Db = mongodb.Db;
var	BSON = mongodb.BSONPure;
var EmpDetail = mongoose.model('EmpDetail');

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('empDetailDB', server, {safe: true});    //Change database name here
db.open(function(err, db){
    if(!err){
        db.collection('superusers', {strict:true}, function(err, collection){
            if(err){
            }
        });
    }
});

exports.index = function(req, res) {
    res.render('home');
}

exports.storeNewEmployee = function(req, res){
    var emp_name = req.body.emp_name;
    var emp_email = req.body.emp_email;
    var emp_age = req.body.emp_age;
    var emp_location = req.body.emp_location;

    var empDetail = new EmpDetail({
        emp_name : emp_name,
        emp_email : emp_email,
        emp_age : emp_age,
        emp_location : emp_location
    });
    empDetail.save(function(err){
        if(err){
            console.error(err);
        }
        res.json({success:true, msg:'success'});
    });
}

exports.fetchAllEmployeeDetail = function(req, res){
    var emp_name = req.body.emp_name;
    var emp_email = req.body.emp_email;
    var emp_age = req.body.emp_age;
    var emp_location = req.body.emp_location;

    EmpDetail.find({},
        function (err, docs ){
            res.json({success:true, documents:docs});
        });
}

exports.deleteSingleEmployee = function(req, res){
    var empId = req.params.empId;

    EmpDetail.remove({_id:BSON.ObjectID(empId)},
        function(err, result){
            if(err){
                res.send({'error':'An error has occurred - ' + err});
            }else{
                res.json({success:true, msg:'success'});
            }
        });
}

exports.fetchSingleEmployee = function(req, res){
    var empId = req.params.empId;

    EmpDetail.find({_id:BSON.ObjectID(empId)},
        function(err, result){
            if(err){
                res.send({'error':'An error has occurred - ' + err});
            }else{
                res.json({success:true, result:result});
            }
        }
    );
}

exports.updateSingleEmployeeDetail = function(req, res){
    var empId = req.params.empId;
    var emp_name = req.body.emp_name;
    var emp_email = req.body.emp_email;
    var emp_age = req.body.emp_age;
    var emp_location = req.body.emp_location;

    EmpDetail.update({'_id':BSON.ObjectID(empId)},
        {$set : {
            "emp_name" : emp_name,
            "emp_email" : emp_email,
            "emp_age" : emp_age,
            "emp_location" : emp_location
        }},
        {safe:true},
        function(err, result){
            if(err){
                res.send({'error':'An error has occurred - ' + err});
            }else{
                res.json({success:true, msg:'success'});
            }
        });
}