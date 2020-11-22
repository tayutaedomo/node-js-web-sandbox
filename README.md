# node-js-web-sandbox
Try Web etc.


## Setup on your local
```
$ git clone git@github.com:tayutaedomo/node-js-web-sandbox.git
$ cd node-js-web-sandbox
$ npm install
$ npm start
$ open 'http://localhost:3000'
```


## Setup for Redis
Set redis config if use Redis.
```
$ export REDIS_URL=redis://user:password@redis-service.com:6379/
```

## Setup for memcached
Set memcached config if use memcached.
```
$ export MEMCACHE_SERVERS=[user:pass@]server1[:11211],[user:pass@]server2[:11211]
```
