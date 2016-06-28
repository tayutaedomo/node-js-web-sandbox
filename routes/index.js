var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Video.js Trial' });
});

router.get('/quick_start', function(req, res, next) {
  res.render('quick_start', { title: 'Quick Start' });
});

router.get('/quick_start_without_auto', function(req, res, next) {
  res.render('quick_start_without_auto', { title: 'Quick Start without auto setup' });
});


module.exports = router;

