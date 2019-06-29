const express = require('express');

const router = express.Router();

router.get('/values', (req, res) => {
  res.send({
    police_nummer: 1234,
    deposit_amount: 'CHF 7777777',
    left_capacity: 'CHF 999900',
    total_engagement: 'CHF 237976',
    amount_prepaid: 'CHF 999900',
    amount_engagement: 'CHF 999900'
  });
  res.end();
});

module.exports = router;
