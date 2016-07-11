var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var knex = require('./db/knex');

require('dotenv').load();

var routes = require('./routes/index');
var users = require('./routes/users');
var dash = require('./routes/dash');
var report = require('./routes/report');
var damages = require('./routes/damages');

var app = express();

app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));
app.options('*', cors());
app.use(cors());

app.use('/', routes);
app.use('/users', users);
app.use('/dash', dash);
app.use('/report', report);

app.get('/damages/:id/review', function(req, res, next) {
  knex.from('damages').innerJoin('vehicles', 'damages.truck_id', 'vehicles.call').where({ 'damages.id':req.params.id }).then( function(data) {
    res.send(data);
  })
})

app.use('/damages', damages);

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
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
