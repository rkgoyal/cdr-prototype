const express = require('express');
const router = express.Router();

// User Model
let User = require('../models/user');

// Launch Human Connect pop-up with options
var HUMANAPI_APP_ID = "cdf0c805007e05f0f084e1bf0da88684cfe027f7";
var HUMANAPI_APP_SECRET = "6db64c7d8eb1fb070c0a6294934b3d0d7bceaf4f";

var options = {
  clientUserId: encodeURIComponent(req.user._id),
  clientId: HUMANAPI_APP_ID, // grab it from app settings page
  publicToken: '',  // Leave blank for new users

  finish: function(err, sessionTokenObject) {
      /* Called after user finishes connecting their health data
       You need to post `sessionTokenObject` to your server to then:
       1. Append your `clientSecret` to it
       2. Send send it to our server for user credentials

       Sending a POST request with jQuery might look like this
      (it's not necessary to use jQuery):
      */
      $.post('/your-servers-endpoint', sessionTokenObject, function(res){

      });

      // Include code here to refresh the page.

  },
  close: function() {
      /* Optional callback called when a user closes the popup
         without connecting any data sources */
  },
  error: function(err) {
      /* Optional callback called if an error occurs when loading
         the popup. */

      // `err` has fields: `code`, `message`, `detailedMessage`
  }
}

HumanConnect.open(options);

// Save HAPI user tokens to user data
var request = require('request');

app.post('/connect/finish', function(req, res) {
  var sessionTokenObject = req.body;
  sessionTokenObject.clientSecret = '#CLIENT_SECRET';

  request({
    method: 'POST',
    uri: 'https://user.humanapi.co/v1/connect/tokens',
    json: sessionTokenObject
  }, function(err, resp, body) {
      if(err) return res.send(422);
      // at this point if request was successfull body object
      // will have `accessToken`, `publicToken` and `humanId` associated in it.
      // You should store these fields in your system in association to user's data.
      res.send(201);

      /* Mobile SDK users - you'll want to send the `publicToken` back to the device here instead */
      // var responseJSON = {publicToken: body.publicToken};
      // res.setHeader('Content-Type', 'application/json');
      // res.status(201).send(JSON.stringify(responseJSON));
  });
});
