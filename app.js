const express = require('express');
const Router = require('Router');
var mongoose = require('mongoose');

var router = Router();

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// mongodb connection 
 mongoose.connect('mongodb://localhost:27017/employee');

// mongoose.connect('mongodb://loaclhost:27017/employee', {
//     useNewUrlParser: true

// }).then(() => {
//     console.log('successfully connected to the database');
// }).catch(err => {
//     console.log('could not connect to the database. exiting now..', err);
//     process.exit();
// });

// app.use(function (req, res) {
//     next();
// });

var index = require('./routes/index');
app.use('/',index);

var employees_create = require('./routes/employees/create');


// employess
app.use('/v1/employees', employees_create);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000);
console.log('port connected'); 

module.exports = app;