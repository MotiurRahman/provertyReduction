var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
 

var routes = require('./routes/index');
var users = require('./routes/users');
var charts = require('./routes/charts');
var poorCharts = require('./routes/poorCharts');
var form = require('./routes/form');
var edit = require('./routes/edit');
var tables = require('./routes/tables');
var algorithm = require('./routes/algorithm');
var solution = require('./routes/solution');
var surveyor = require('./routes/signup/surveyor');
var govt_org = require('./routes/signup/govt_org');
var addTo = require('./routes/t_institute/addTo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use(expressLayouts);


app.use('/', routes);
app.use('/users', users);
app.use('/charts', charts);
app.use('/poorCharts', poorCharts);
app.use('/form', form);
app.use('/edit', edit);
app.use('/tables', tables);
app.use('/algorithm', algorithm);
app.use('/solution', solution);
app.use('/surveyor_signup', surveyor);
app.use('/govt_org_signup', govt_org);
app.use('/addTo', addTo);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
