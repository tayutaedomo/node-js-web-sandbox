var express = require('express');
var router = express.Router();

//var beautify = require('js-beautify').js_beautify;
var redis_url = process.env.REDIS_URL;


// router.get('/:view', function(req, res, next) {
//   res.render('cache/' + req.params.view, { title: req.params.view + ' | Cache Middleware' });
// });

router.get('/redis/get', function(req, res) {
  res.render('cache/redis/get', {
    title : 'Redis Get',
    data: { params: {} }
  });
});

router.post('/redis/get', function(req, res) {
  var key = req.body.key;
  var params = { key: key };

  var redis = require('redis');
  var client = redis.createClient(redis_url);

  // TODO: How to integrate connect error handling
  client.on('error', function (err) {
    console.error(err);
  });

  var payload =  {
    title : 'Redis Get',
    data: {
      params: params
    }
  };

  client.get(key, function(err, value) {
    if (err) {
      //beautify(JSON.stringify(err), { indent_size: 2 })
      payload.data.error = JSON.stringify(err, null, 2);

    } else {
      if (value == null) {
        payload.data.result = 'Value is null.';
      } else {
        payload.data.result = value;
      }
    }

    res.render('cache/redis/get', payload);
  });
});

router.get('/ioredis/get', function(req, res) {
  res.render('cache/ioredis/get', {
    title : 'ioredis Get',
    data: { params: {} }
  });
});

router.post('/ioredis/get', function(req, res) {
  var key = req.body.key;
  var params = { key: key };

  var Redis = require('ioredis');
  var redis = new Redis(redis_url);

  var payload =  {
    title : 'Redis Get',
    data: {
      params: params
    }
  };

  redis.get(key, function (err, result) {
    if (err) {
      payload.data.error = JSON.stringify(err, null, 2);

    } else {
      if (result == null) {
        payload.data.result = 'Value is null.';
      } else {
        payload.data.result = result;
      }
    }

    res.render('cache/ioredis/get', payload);
  });
});

router.get('/ioredis/set', function(req, res) {
  res.render('cache/ioredis/set', {
    title : 'ioredis Set',
    data: { params: {} }
  });
});

router.post('/ioredis/set', function(req, res) {
  var key = req.body.key;
  var value = req.body.value;
  var params = { key: key };

  var Redis = require('ioredis');
  var redis = new Redis(redis_url);

  var payload =  {
    title : 'Redis Set',
    data: {
      params: params
    }
  };

  redis.set(key, value, function(err, result) {
    if (err) {
      payload.data.error = JSON.stringify(err, null, 2);
    } else {
      payload.data.result = result;
    }

    res.render('cache/ioredis/get', payload);
  });
});

router.get('/node-memcached-client/get', function(req, res) {
  res.render('cache/node-memcached-client/get', {
    title : 'node-memcached-client Get',
    data: { params: {} }
  });
});

router.post('/node-memcached-client/get', function(req, res) {
  var key = req.body.key;
  var params = { key: key };

  var Memcached = require('node-memcached-client');
  var client = new Memcached({
    host: 'localhost',
    port: 11211
  });

  var payload =  {
    title : 'node-memcached-client Get',
    data: {
      params: params
    }
  };

  client.connect().then(function(c) {
    return c.get(key);

  }).then(function(value) {
    if (value == null) {
      payload.data.result = 'Value is null.';
    } else {
      payload.data.result = value;
    }

    res.render('cache/node-memcached-client/get', payload);

  }).catch(function(err) {
    payload.data.error = JSON.stringify(err, null, 2);
    res.render('cache/node-memcached-client/get', payload);
  });
});


module.exports = router;

