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


module.exports = router;

