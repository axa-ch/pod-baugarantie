const express = require('express');

const router = express.Router();

const answerMethods = require('./data/response-methods.json');
const answerCareProviders = require('./data/response-care-providers.json');

router.get('/methods', (req, res) => {
  res.set('content-type', 'application/json');
  res.send(answerMethods);
  res.end();
});

router.get('/care-providers', (req, res) => {
  res.set('content-type', 'application/json');
  res.send(answerCareProviders);
  res.end();
});

module.exports = router;
