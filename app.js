//require('sqreen');

const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const beautify = require('js-beautify').js_beautify;

const routes = require('./routes/index');
const cache_routes = require('./routes/cache');
const stripe_routes = require('./routes/stripe');
const file_upload_routes = require('./routes/file_upload');
const mediainfo_routes = require('./routes/mediainfo');
const pdf_routes = require('./routes/pdf');
const jimp_routes = require('./routes/jimp');
const crypto_routes = require('./routes/crypto');

const app = express();

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// locals
app.locals.beautify = beautify;

app.use('/cache', cache_routes);
app.use('/stripe', stripe_routes);
app.use('/file_upload', file_upload_routes);
app.use('/mediainfo', mediainfo_routes);
app.use('/pdf', pdf_routes);
app.use('/jimp', jimp_routes);
app.use('/crypto', crypto_routes);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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

