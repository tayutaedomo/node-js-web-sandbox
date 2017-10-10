# node-js-web-sandbox
Try Web etc.


# Setup on your local
Need Node.js and npm.

Get source code, install modules and start app.
```
$ git clone git@github.com:tayutaedomo/videojs-trial.git
$ cd videojs-trial
$ npm install
$ bin/www
```
Your app should now be running on http://localhost:3000.


# Setup for Redis
Set redis config if use Redis.
```
$ export REDIS_URL=redis://user:password@redis-service.com:6379/
```

# Setup for memcached
Set memcached config if use memcached.
```
$ export MEMCACHE_SERVERS=[user:pass@]server1[:11211],[user:pass@]server2[:11211]
```


# License
MIT

