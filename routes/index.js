var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('req.headers["x-forwarded-for"]', req.headers['x-forwarded-for']);
  console.log('req.connection.remoteAddress', req.connection.remoteAddress);
  console.log('req.headers["x-appengine-user-ip"]', req.headers['x-appengine-user-ip']);
  console.log('req.ip', req.ip);
  console.log('req.ips', req.ips);

  res.render('index', { title: 'Video.js Trial' });
});

router.get('/videojs/quick_start', function(req, res, next) {
  res.render('videojs/quick_start', { title: 'Quick Start' });
});

router.get('/videojs/quick_start_without_auto', function(req, res, next) {
  res.render('videojs/quick_start_without_auto', { title: 'Quick Start without auto setup' });
});

router.get('/videojs/guide_setup', function(req, res, next) {
  res.render('videojs/guide_setup', { title: 'Guide: Setup' });
});

router.get('/videojs/guide_setup_centered', function(req, res, next) {
  res.render('videojs/guide_setup_centered', { title: 'Guide: Setup with play button centered' });
});

router.get('/videojs/guide_setup_dynamically', function(req, res, next) {
  res.render('videojs/guide_setup_dynamically', { title: 'Guide: Setup with dynamically loaded' });
});

router.get('/videojs/contrib_hls', function(req, res, next) {
  res.render('videojs/contrib_hls', { title: 'videojs-contrib-hls' });
});

router.get('/videojs/design_resizing', function(req, res, next) {
  res.render('videojs/design_resizing', { title: 'Design: Resizing' });
});

router.get('/videojs/events', function(req, res, next) {
  res.render('videojs/events', { title: 'Events' });
});

router.get('/agilecrm/api', function(req, res, next) {
  res.render('agilecrm/api', { title: 'Agile CRM API' });
});


module.exports = router;

