'use strict';

var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var exphbs       = require('express-handlebars');

var front = require('./routes/front');
var api    = require('./routes/api');

var app = express();

//TODO: create the right migrations for setting up production code


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', exphbs({
  extname: '.html',
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'main.html'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', '.html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', front);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err)
    res.render('404', {
      message: err.message,
      error: err,
      layout: false
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('404', {
    message: err.message,
    error: {},
    layout: false
  });
});


module.exports = app;
