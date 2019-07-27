const express = require('express');

const router = express.Router();

router.get('/values/:id', (req, res) => {
  const { params: { id } } = req;

  if (id === '8.551.922') {
    res.send({
      police_nummer: 567567,
      deposit_amount: 'CHF 45000',
      left_capacity: 'CHF 70999',
      total_engagement: 'CHF 2345678',
      amount_prepaid: 'CHF 70999',
      amount_engagement: 'CHF 70999'
    });
  } else {
    res.send({
      police_nummer: 1234,
      deposit_amount: 'CHF 7777777',
      left_capacity: 'CHF 999900',
      total_engagement: 'CHF 237976',
      amount_prepaid: 'CHF 999900',
      amount_engagement: 'CHF 999900'
    });
  }

  res.end();
});

module.exports = router;
