var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('req.headers["x-forwarded-for"]', req.headers['x-forwarded-for']);
  console.log('req.connection.remoteAddress', req.connection.remoteAddress);
  console.log('req.headers["x-appengine-user-ip"]', req.headers['x-appengine-user-ip']);
  console.log('req.ip', req.ip);
  console.log('req.ips', req.ips);

  res.render('index', { title: 'Web Sandbox' });
});


var VIDEOJS_TITLES = {
  quick_start: 'Quick Start',
  quick_start_without_auto: 'Quick Start without auto setup',
  guide_setup:  'Guide: Setup',
  guide_setup_centered: 'Guide: Setup with play button centered',
  guide_setup_dynamically: 'Guide: Setup with dynamically loaded',
  contrib_hls: 'videojs-contrib-hls',
  design_resizing: 'Design: Resizing',
  events: 'Events'
};
router.get('/videojs/:view', function(req, res) {
  var title = VIDEOJS_TITLES[req.params.view] ? VIDEOJS_TITLES[req.params.view] : req.params.view;
  res.render('videojs/' + req.params.view, { title : title });
});

router.get('/agilecrm/api', function(req, res, next) {
  res.render('agilecrm/api', { title: 'Agile CRM API' });
});

router.get('/dom/:view', function(req, res, next) {
  res.render('dom/' + req.params.view, { title: req.params.view + ' | DOM' });
});

router.get('/css/:view', function(req, res, next) {
  res.render('css/' + req.params.view, { title: req.params.view + ' | CSS' });
});

router.get('/js/:view', function(req, res, next) {
  res.render('js/' + req.params.view, { title: req.params.view + ' | Javascript' });
});

router.get('/webrtc/:view', function(req, res, next) {
  res.render('webrtc/' + req.params.view, { title: req.params.view + ' | Media API' });
});


module.exports = router;

