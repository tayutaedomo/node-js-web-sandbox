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

router.get('/canvas/:view', function(req, res, next) {
  res.render('canvas/' + req.params.view, { title: req.params.view + ' | Canvas' });
});

router.get('/timeline/:view', function(req, res, next) {
  res.render('timeline/' + req.params.view, { title: req.params.view + ' | Timeline' });
});

router.get('/ios/:view', function(req, res, next) {
  res.render('ios/' + req.params.view, { title: req.params.view + ' | iOS Web' });
});

router.get('/hlsjs/:view', function(req, res, next) {
  res.render('hlsjs/' + req.params.view, { title: req.params.view + ' | hls.js' });
});

router.get('/qrcode/:view', function(req, res, next) {
  res.render('qrcode/' + req.params.view, { title: req.params.view + ' | QR Code' });
});

router.get('/scheme/:view', function(req, res, next) {
  res.render('scheme/' + req.params.view, { title: req.params.view + ' | URL Scheme' });
});

router.get('/html_video/:view', function(req, res, next) {
  res.render('html_video/' + req.params.view, { title: req.params.view + ' | HTMLVideoElement' });
});



router.get('/manifest.json', function(req, res) {
  res.send(
    {
      "short_name": "TayuWebSdx",
      "name": "Tayutaedomo Web Sandbox",
      "icons": [
        {
          "src": "/images/icon/app_48x48.png",
          "type": "image/png",
          "sizes": "48x48"
        }
        // {
        //   "src": "launcher-icon-2x.png",
        //   "type": "image/png",
        //   "sizes": "96x96"
        // },
        // {
        //   "src": "launcher-icon-4x.png",
        //   "type": "image/png",
        //   "sizes": "192x192"
        // }
      ],
      "start_url": "/?manifest=1",
      "display": "browser"
      //"display": "standalone"
      //"orientation": "landscape"
    });
});





module.exports = router;

