
var intents_app = angular.module('app', []);

intents_app.controller('StripeIntentsController', function StripeIntentsController($scope, $http, $window) {

  $scope.cardholder_name = '';

  var stripe = $window.Stripe('pk_test_7fvh7dT8TfcKxZa2USG3zEOy');

  var elements = stripe.elements();
  var cardElement = elements.create('card');
  cardElement.mount('#card-element');

  $scope.on_click = function(event) {
    stripe.createPaymentMethod('card', cardElement, {
      billing_details: { name: $scope.cardholder_name }
    }).then(function(result) {
      console.log('createPaymentMethod:result', result);

      if (result.error) {
        // Show error in payment form
        console.error(result.error);

      } else {
        var url = '/stripe/intents/api/confirm_payment';
        var params = { payment_method_id: result.paymentMethod.id };

        $http.post(url, params).then(function(result) {
          handleServerResponse(result.data);

        }).catch(function(result) {
          console.error(result);
        });
      }
    });
  };

  function handleServerResponse(response) {
    if (response.error) {
      // Show error from server on payment form
      console.error(response.error);

    } else if (response.requires_action) {
      // Use Stripe.js to handle required card action
      stripe.handleCardAction(
        response.payment_intent_client_secret
      ).then(function(result) {
        if (result.error) {
          // Show error in payment form
          console.error(response.error);

        } else {
          // The card action has been handled
          // The PaymentIntent can be confirmed again on the server
          var url = '/stripe/intents/api/confirm_payment';
          var params = { payment_intent_id: result.paymentIntent.id };

          $http.post(url, params).then(function(result) {
            handleServerResponse(result.data);

          }).catch(function(result) {
            console.error(result);
          });
        }
      });

    } else {
      // Show success message
      console.log('Succeeded.', response);
    }
  }

});

