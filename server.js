//setup Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var _ = require('underscore');
var cons = require('consolidate');
var util = require('util');
var app = express();
var bodyParser = require('body-parser')
require('./db');
var employee = require('./routes/employee_module');

app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view options', {layout: false});
app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.get('/', employee.index);

app.post('/employeedetail/save', employee.storeNewEmployee);

app.get('/employeedetail/fetchdetail', employee.fetchAllEmployeeDetail);

app.post('/deleteEmployee/:empId', employee.deleteSingleEmployee);

app.get('/fetchSingleEmployee/:empId', employee.fetchSingleEmployee);

app.post('/updateSingleEmployeeDetail/:empId', employee.updateSingleEmployeeDetail);


var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('server running at port: '+ app.get('port'))
});