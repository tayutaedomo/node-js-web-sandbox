var express = require('express');
var router = express.Router();


// router.get('/:view', function(req, res, next) {
//   res.render('cache/' + req.params.view, { title: req.params.view + ' | Cache Middleware' });
// });

router.get('/redis/get', function(req, res) {
  res.render('cache/redis/get', { title : 'Redis Get', data: { params: {} } });
});

router.post('/redis/get', function(req, res) {
  var key = req.body.key;

  var params = { key: key };
  res.render('cache/redis/get', { title : 'Redis Get', data: { params: params } });
});


module.exports = router;

