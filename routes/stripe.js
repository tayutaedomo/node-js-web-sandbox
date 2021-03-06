var debug = require('debug')('node-js-web-sandbox:routes:stripe');
var express = require('express');
var router = express.Router();

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


router.get('/checkout', function(req, res) {
  res.render('stripe/checkout', {
    title : 'Stripe Checkout',
    data: { params: {} }
  });
});

router.post('/checkout', function(req, res) {
  var payload = {
    title : 'Stripe Checkout',
    data: {
      params: {},
      result_list: []
    }
  };

  payload.data.params.email = req.body.email;
  payload.data.params.token = req.body.stripeToken;
  debug(payload.data.params);

  // See: https://stripe.com/docs/quickstart#saving-card-information
  stripe.customers.create({
    email:  payload.data.params.email,
    source: payload.data.params.token

  }).then(function(customer) {
    // YOUR CODE: Save the customer ID and other info in a database for later.

    debug(customer);
    payload.data.result_list.push(customer);

    return stripe.charges.create({
      amount: 1000,
      currency: "usd",
      customer: customer.id
    });

  }).then(function(charge) {
    // Use and save the charge info.

    debug(charge);
    payload.data.result_list.push(charge);
    payload.data.result = JSON.stringify(payload.data.result_list, null, 2);

    res.render('stripe/checkout', payload);

  }).catch(function(err) {
    console.error(err.stack);

    payload.data.error = err;

    res.render('stripe/checkout', payload);
  });
});

router.get('/checkout_price', function(req, res) {
  res.render('stripe/checkout_price', {
    title : 'Stripe Checkout without Price',
    data: { params: {} }
  });
});

router.post('/checkout_price', function(req, res) {
  var payload = {
    title : 'Stripe Checkout without Price',
    data: {
      params: {},
      result_list: []
    }
  };

  payload.data.params.email = req.body.email;
  payload.data.params.token = req.body.stripeToken;
  debug(payload.data.params);

  stripe.customers.create({
    email:  payload.data.params.email,
    source: payload.data.params.token

  }).then(function(customer) {
    // YOUR CODE: Save the customer ID and other info in a database for later.

    debug(customer);
    payload.data.result_list.push(customer);

    if (req.body.no_charge == 1) return {};

    return stripe.charges.create({
      amount: 2000,
      currency: "usd",
      customer: customer.id
    });

  }).then(function(charge) {
    // Use and save the charge info.

    debug(charge);
    payload.data.result_list.push(charge);
    payload.data.result = JSON.stringify(payload.data.result_list, null, 2);

    res.render('stripe/checkout_price', payload);

  }).catch(function(err) {
    console.error(err.stack);

    payload.data.error = err;

    res.render('stripe/checkout_price', payload);
  });
});

router.get('/charge', function(req, res) {
  res.render('stripe/charge', {
    title : 'Stripe Charge',
    data: { params: {} }
  });
});

router.post('/charge', function(req, res) {
  var payload = {
    title : 'Stripe Charge',
    data: { params: {} }
  };

  stripe.charges.create({
    amount: 1000,
    currency: "usd",
    // amount: 1000,
    // currency: "jpy",
    customer: req.body.customer_id

  }).then(function(charge) {
    debug(charge);
    payload.data.result = JSON.stringify(charge, null, 2);

    res.render('stripe/charge', payload);

  }).catch(function(err) {
    console.error(err.stack);

    payload.data.error = err;

    res.render('stripe/charge', payload);
  });
});

router.get('/subscription', function(req, res) {
  res.render('stripe/subscription', {
    title : 'Stripe Subscription',
    data: { params: {} }
  });
});

router.post('/subscription', function(req, res) {
  var payload = {
    title : 'Stripe Subscription',
    data: { params: {} }
  };

  stripe.subscriptions.create({
    customer: req.body.customer_id,
    items: [
      {
        plan: 'usd_monthly'
      }
    ]

  }).then(function(subscription) {
    debug(subscription);
    payload.data.result = JSON.stringify(subscription, null, 2);

    res.render('stripe/charge', payload);

  }).catch(function(err) {
    console.error(err.stack);

    payload.data.error = err;

    res.render('stripe/subscription', payload);
  });
});

router.get('/elements', function(req, res) {
  res.render('stripe/elements', {
    title : 'Stripe Elements',
    data: { params: {} }
  });
});

router.post('/elements', function(req, res) {
  var payload = {
    title : 'Stripe Elements',
    data: {
      params: {},
      result_list: []
    }
  };

  payload.data.params = req.body;
  payload.data.result = JSON.stringify(req.body, null, 2);

  res.render('stripe/elements', payload);
});


router.get('/v3_checkout_client', function(req, res) {
  res.render('stripe/v3_checkout_client', {
    title : 'Stripe v3 Checkout Client',
    data: { req: req, res: res }
  });
});

router.get('/v3_checkout_client/success', function(req, res) {
  res.render('stripe/v3_checkout_client', {
    title : 'Stripe v3 Checkout Client Success',
    data: { req: req, res: res }
  });
});

router.get('/v3_checkout_client/cancel', function(req, res) {
  res.render('stripe/v3_checkout_client', {
    title : 'Stripe v3 Checkout Client Cancel',
    data: { req: req, res: res }
  });
});

router.get('/v3_checkout_server', (req, res) => {
  let base_url = `${req.protocol}://`;
  base_url += req.hostname == 'localhost' ? 'localhost:3002' : req.hostname;
  const success_url = `${base_url}/stripe/v3_checkout_server/success`;
  const cancel_url  = `${base_url}/stripe/v3_checkout_server/cancel`;

  const payload = {
    title : 'Stripe v3 Checkout Server',
    data: { req: req, res: res }
  };

  stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      name: 'T-shirt',
      description: 'Comfortable cotton t-shirt',
      images: ['https://tayutaedomo-web.herokuapp.com/images/shutterstock_125750330.jpg'],
      amount: 1000,
      currency: 'usd',
      quantity: 1,
    }],
    success_url: success_url,
    cancel_url: cancel_url,
  }, (err, session) => {
    if (err) {
      console.error(err.stack || err);

      payload.data.error = err;

    } else {
      payload.data.session = session;
    }

    debug('v3_checkout_server payload', payload);

    res.render('stripe/v3_checkout_server', payload);
  });
});

router.get('/v3_checkout_server/success', (req, res) => {
  res.render('stripe/v3_checkout_server', {
    title : 'Stripe v3 Checkout Server Success',
    data: { req: req, res: res }
  });
});

router.get('/v3_checkout_server/cancel', (req, res) => {
  res.render('stripe/v3_checkout_server', {
    title : 'Stripe v3 Checkout Server Cancel',
    data: { req: req, res: res }
  });
});



module.exports = router;

